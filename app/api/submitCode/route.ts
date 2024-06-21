import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';



const Paths: Record<string, string> = {
  "challenge_1": "Challenge1.py"
};

// debug get request
export async function GET(request: NextRequest) {
  console.log("hello", request.body);
  return new Response("hello");
}

interface PostData {
  challengeId: keyof typeof Paths;
  userID:string,
  code: string;
}

// handling code submission
export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json(); // getting code

    // Define the file path within the tmp directory in the root of the app
    const tmpDir = path.join(process.cwd(), 'ChallengeCode/tmp');
    const filePath = path.join(tmpDir, 'output.py');

    // Ensure the tmp directory exists
    await fs.mkdir(tmpDir, { recursive: true });

    // Write the received code to the file
    await fs.writeFile(filePath, data.code);

    // Execute the Python file synchronously
    const output = execSync(`python ${filePath}`, { encoding: 'utf-8' });
    const checkOutput = execSync(`python ChallengeCode/${Paths[data.challengeId]}`, { encoding: 'utf-8' });

    if(output==checkOutput){
      return NextResponse.json({ result: "success" });
    }
    // sending back output
    return NextResponse.json({ result: "failure" });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}