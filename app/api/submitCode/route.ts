import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { exec } from 'child_process';

const Paths: Record<string, string> = {
  "challenge_1": "../solution/Challenge1.py"
};

export async function GET(request: NextRequest) {
  console.log("hello", request.body);
  return new Response("hello");
}

interface PostData {
  challengeId: keyof typeof Paths;
  userID: string,
  code: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json();

    const tmpDir = path.join(process.cwd(), 'ChallengeCode/tmp');
    const userDir = path.join(tmpDir, uuidv4());
    const filePath = path.join(userDir, 'user_code.py');

    await fs.mkdir(userDir, { recursive: true });
    await fs.writeFile(filePath, data.code);

    const challengeFilePath = path.join(process.cwd(), `solution/${Paths[data.challengeId]}`);

    // Docker command to execute the user code safely
    const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py`;
    const output = execSync(command, { encoding: 'utf-8' });
    const checkOutput = execSync(`python ${challengeFilePath}`, { encoding: 'utf-8' });

    await fs.rm(userDir, { recursive: true, force: true });

    if (output === checkOutput) {
      return NextResponse.json({ result: output });
    }

    return NextResponse.json({ result: "failure" });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
