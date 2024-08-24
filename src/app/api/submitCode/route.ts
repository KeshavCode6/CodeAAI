import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/database/dbConnect';
import User from '@/lib/database/schemas/User';
import Challenge from '@/lib/database/schemas/Challenge';
import { getUserFromToken } from '@/lib/getUserFromToken';
import { wasInLastDay } from '@/lib/wasInLastDay';

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
    if(challenge.isDaily && wasInLastDay(challenge.creationTimeStamp)){
      return NextResponse.json({ result: "This challenge has expired.." });
    }

    if (user.challenges.has(data.challengeId) && user.challenges.get(data.challengeId) == "solved") {
      return NextResponse.json({ result: "You solved this challenge already!" });
    }
    
    const {testCases} = challenge;
    let visibleTestCases: VisibleTestCase[] = [];
    let passed = 0;
    let failed = 0;
    let index = 0;

    let executionTime;

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
        args += `${value.args.get(argument)} `;
      });


      // Using Docker and a Python sandbox to execute the user code safely
      const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py ${args}`;
      let output: string;
      try {

        output = execSync(command, { encoding: 'utf-8', timeout: 5000}); // code output
      } catch (error: any) {
        //@ts-ignore
        output = error.stdout ? error.stdout.toString() : error.message;
      }

      // deleting the Docker directory after execution
      await fs.rm(userDir, { recursive: true, force: true });

      // Check the output against expected output
      let check = value.output;
      if(typeof check !== "string"){
        check = check.toString()
      }
      const fail = output.trim() !== check.trim();
      if (!fail) {
        passed += 1;
      } else {
        failed += 1;
      }

      if (index < 2) {
        visibleTestCases.push({
          input: value.args,
          expected: value.output,
          received: output.trim(),
          result: !fail
        });
      }
      index += 1;
    }

    let finalResult = "Failed";
    if (failed === 0) {

      finalResult = "Passed";

      await dbConnect();

      try {

        let change = challenge.points;
        // Create a new Date object
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
        const day = String(currentDate.getDate()).padStart(2, '0');
        const year = currentDate.getFullYear();

        // Format the date as month/day/year
        const formattedDate = `${month}/${day}/${year}`;
        user.points += change;
        
        // Check if the formattedDate key exists in pointsOverTime
        if (user.pointsOverTime.has(formattedDate)) {
            user.pointsOverTime.set(formattedDate, user.pointsOverTime.get(formattedDate) + change);
        } else {
            user.pointsOverTime.set(formattedDate, change);
        }
        user.markModified('pointsOverTime');

        if (user.challenges.has(data.challengeId) && user.challenges.get(data.challengeId) === "open") {
          user.challenges.set(data.challengeId, "solved");
          user.markModified('challenges');
        }

        await user.save();

        const solvedChallenge = await Challenge.findOne({id: data.challengeId});
        solvedChallenge.solves += 1;
        await solvedChallenge.save();

      } catch (error) {
        console.error("Error finding or updating user:", error);
      }
    }

    // returning data
    return NextResponse.json({ result: finalResult, failed, total: passed + failed, visibleTestCases, executionTime });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
