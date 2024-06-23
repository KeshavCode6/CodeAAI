import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/database/dbConnect';
import User from '@/lib/database/schemas/User';
import Challenge from '@/lib/database/schemas/Challenge';
import { getUserFromToken } from '@/lib/getUserFromToken';

interface PostData {
  challengeId: string;
  code: string;
}

export interface VisibleTestCase {
  input: any,
  expected: string,
  received: string,
  result: boolean
}

export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json(); // getting data

    //@ts-ignore
    const userId = (await getUserFromToken(request.cookies)).user.id;

    let challenge = await Challenge.findOne({ id: data.challengeId });
    let user = await User.findOne({ id: userId });

    // ensuring challenge and user exists
    if (!challenge || !user) {
      return NextResponse.json({ result: "Invalid Challenge or user ID" });
    }

    if (user.challenges.has(data.challengeId) && user.challenges.get(data.challengeId) == "solved") {
      return NextResponse.json({ result: "You solved this challenge already!" });
    }
    // getting test cases
    const file = await fs.readFile(process.cwd() + '/solutions/challenges.json', 'utf8');
    const testCases = JSON.parse(file)[data.challengeId];
    let visibleTestCases: VisibleTestCase[] = [];
    let passed = 0;
    let failed = 0;
    let index = 0;

    // Use for..of loop to handle async/await correctly
    for (const value of testCases) {
      // creating directory to store user provided code
      const tmpDir = path.join(process.cwd(), 'tmp');
      const userDir = path.join(tmpDir, uuidv4());
      await fs.mkdir(userDir, { recursive: true });

      // writing user code within that directory
      const filePath = path.join(userDir, 'user_code.py');
      await fs.writeFile(filePath, data.code);

      // Prepare the arguments string
      let args = "";
      challenge.arguments.forEach((argument: string) => {
        args += `${value.args[argument]} `;
      });

      // Using Docker and a Python sandbox to execute the user code safely
      const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py ${args}`;
      let output: string;
      try {
        output = execSync(command, { encoding: 'utf-8' }); // code output
      } catch (error:any) {
        //@ts-ignore
        output = error.stdout ? error.stdout.toString() : error.message;
      }

      // deleting the Docker directory after execution
      await fs.rm(userDir, { recursive: true, force: true });

      // Check the output against expected output
      const fail = output.trim() !== value.output.trim();
      if (!fail) {
        passed += 1;
      } else {
        failed += 1;
      }
      
      if(index<2){
        visibleTestCases.push({
          input: value.args,
          expected: value.output,
          received: output.trim(),
          result: !fail
        });
      }
      index+=1;
    }

    let finalResult = "Failed";
    if (failed === 0) {
      finalResult = "Passed";
      await dbConnect();

      try {
        user.points += challenge.points;
        if (user.challenges.has(data.challengeId) && user.challenges.get(data.challengeId) === "open") {
          user.challenges.set(data.challengeId, "solved");
          user.markModified('challenges');
        }

        await user.save();
      } catch (error) {
        console.error("Error finding or updating user:", error);
      }
    }

    // returning data
    return NextResponse.json({ result: finalResult, failed: failed, total: passed + failed, visibleTestCases: visibleTestCases });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
