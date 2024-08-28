import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import {prismaClient} from '@/lib/prisma'; // Adjust the import based on your structure
import { getUserFromToken } from '@/lib/getUserFromToken';
import { v4 as uuidv4 } from 'uuid';

interface PostData {
  challengeId: string;
  code: string;
}

export interface VisibleTestCase {
  input: any;
  expected: string;
  received: string;
  result: boolean;
}

function wasInLastDay(timestamp: number) {

  const currentTime = Date.now();

  const difference = currentTime - timestamp;
  const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

  return difference > twentyFourHoursInMs;

}

export async function POST(request: NextRequest) {
  try {
    const data: PostData = await request.json();

    const user = await getUserFromToken(request.cookies);

    if(!user){
      return NextResponse.json({ result: "Not logged in!" });
    }

    const dbUser =await prismaClient.user.findUnique({
      where: { email: user?.email || ""},
    });

    if(!dbUser){
      return NextResponse.json({ result: "Doesn't exist in db?" });
    }

    const challenge = await prismaClient.challenge.findUnique({
      where: { challengeId: data.challengeId },
    });

    if (!challenge) {
      return NextResponse.json({ result: "Invalid Challenge!" });
    }

    
    if (challenge.isDaily && wasInLastDay(challenge.creationTimestamp.getUTCDate())) {
      return NextResponse.json({ result: "This challenge has expired." });
    }


    const userChallengeData = await prismaClient.userChallenges.findFirst({where:{challengeId:challenge?.id, userId:dbUser.id}})

    // if (userChallengeData?.solved) {
    //   return NextResponse.json({ result: "You solved this challenge already!" });
    // }

    const testCases = await prismaClient.testCase.findMany({
      where: { challengeId: challenge.id }
    });
    

    let visibleTestCases: VisibleTestCase[] = [];
    let passed = 0;
    let failed = 0;
    let index = 0;

    for (const value of testCases) {

      const tmpDir = path.join(process.cwd(), 'tmp');
      const userDir = path.join(tmpDir, uuidv4());
      await fs.mkdir(userDir, { recursive: true });

      const filePath = path.join(userDir, 'user_code.py');
      await fs.writeFile(filePath, data.code);

      const argsJson = value.args;

      let args = "";
      challenge.arguments.forEach((argument: string) => {
        if(argsJson!==null ){
          //@ts-ignore
          args += `${argsJson[argument]} `;
        }
      });

      const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py ${args}`;
      let output: string;
      try {
        output = execSync(command, { encoding: 'utf-8', timeout: 5000 });
      } catch (error: any) {
        output = error.stdout ? error.stdout.toString() : error.message;
      }

      console.log(output)

      await fs.rm(userDir, { recursive: true, force: true });

      const check = value.output.toString().trim();
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
          result: !fail,
        });
      }
      index += 1;
    }

    let finalResult = failed === 0 ? "Passed" : "Failed";

    if (finalResult === "Passed") {
      const change = challenge.points;
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // format as YYYY-MM-DD

      await prismaClient.user.update({
        where: { id: dbUser.id },
        data: {
          points: { increment: change },
          solves: { increment: 1 },
        },
      });

      await prismaClient.userChallenges.updateMany({
        where: { userId: dbUser.id, challengeId:challenge.id },
        data: {
           solved:true
        },
      });

      await prismaClient.challenge.update({
        where: { challengeId: data.challengeId },
        data: { solves: { increment: 1 } },
      });
    }

    return NextResponse.json({ result: finalResult, failed, total: passed + failed, visibleTestCases });

  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
