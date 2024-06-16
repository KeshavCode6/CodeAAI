import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
  console.log("hello", request.body);
  return new Response("hello");
}

export async function POST(request:NextRequest) {
  try {
    const data = await request.json();

    // Define the file path within the tmp directory in the root of the app
    const tmpDir = path.join(process.cwd(), 'tmp');
    const filePath = path.join(tmpDir, 'output.py');

    // Ensure the tmp directory exists
    await fs.mkdir(tmpDir, { recursive: true });

    // Write the received code to the file
    await fs.writeFile(filePath, data.code);

    // Execute the Python file synchronously
    const output = execSync(`python ${filePath}`, { encoding: 'utf-8' });

    console.log(`Execution output: ${output}`);
    return NextResponse.json({ result: output });
 } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
