import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/database/dbConnect';
import User from '@/lib/database/schemas/User';
import Challenge from '@/lib/database/schemas/Challenge';

// making sure code submission is of this type
interface PostData {
  challengeId: keyof typeof Paths;
  userId: string,
  code: string;
}

// map of challenge ids to challenge solutions 
const Paths: Record<string, string> = {
  "challenge_1": "Challenge1.py"
};

export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json(); // getting data

    // ensuring challenge exists
    let challenge = await Challenge.findOne({ id: data.challengeId });

    if(!challenge){
      return NextResponse.json({ result: "Invalid Challenge ID"});
    }

    // creating directory to store user provided code
    const tmpDir = path.join(process.cwd(), 'tmp');
    const userDir = path.join(tmpDir, uuidv4());
    await fs.mkdir(userDir, { recursive: true });

    // writing user code within that directory
    const filePath = path.join(userDir, 'user_code.py');
    await fs.writeFile(filePath, data.code);

    // Using dockers and a python sandbox to execute the user code safely 
    const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py`;
    const output = execSync(command, { encoding: 'utf-8' }); // code output

    // executing challenge solution. not using a docker because this is our code; not users
    const challengeFilePath = path.join(process.cwd(), `solutions/${Paths[data.challengeId]}`);
    const checkOutput = execSync(`python ${challengeFilePath}`, { encoding: 'utf-8' });
    

    let result = "Failed"
    // checking if output equals solution
    if (output.trim() === checkOutput.trim()) {
      result = "Passed"

      await dbConnect();

      try {
        let user = await User.findOne({ id: data.userId });
      
        if (user) {
          user.points += challenge.points;

          await user.save();
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error finding or updating user:", error);
      }
    }

    // deleting the docker directory after execution
    await fs.rm(userDir, { recursive: true, force: true });
    
    // returning data
    return NextResponse.json({ result: result, output:output });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
