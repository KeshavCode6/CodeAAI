import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma'; // Adjust the import based on your structure
import { getUserFromToken } from '@/lib/getUserFromToken';
import { v4 as uuidv4 } from 'uuid';
import { ApiErrors } from "@/lib/apiErrors";

interface ChallengeSubmission {
  challengeId: string;
  code: string;
}

export interface TestCaseResult {
  input: any;
  expected: string;
  received: string;
  result: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const submissionData: ChallengeSubmission = await request.json();

    // Check if user is logged in
    const userAuthData = await getUserFromToken(request.cookies);
    if (!userAuthData) {
      return NextResponse.json(...ApiErrors.REQUEST_USER_NOT_LOGGED_IN);
    }

    // Get user data from the database
    const user = await prismaClient.user.findUnique({
      where: { email: userAuthData.email || "" },
    });

    // Ensure the user exists
    if (!user) {
      return NextResponse.json(...ApiErrors.INVALID_USER_DATA);
    }

    // Find the challenge data
    const challenge = await prismaClient.challenge.findUnique({
      where: { challengeId: submissionData.challengeId },
    });

    // Ensure the challenge exists
    if (!challenge) {
      return NextResponse.json(...ApiErrors.INVALID_CHALLENGE_DATA);
    }

    // Get the user's challenge status
    const userChallengeStatus = await prismaClient.userChallenges.findFirst({
      where: { challengeId: challenge.id, userId: user.id }
    });

    // If the user has solved the challenge already, do not run the code again
    if (userChallengeStatus?.solved) {
      return NextResponse.json(...ApiErrors.CHALLENGE_ALREADY_SOLVED);
    }

    // Get all test cases associated with the challenge
    const testCases = await prismaClient.testCase.findMany({
      where: { challengeId: challenge.id }
    });

    // Test case results to return to the user
    let visibleTestCases: TestCaseResult[] = [];
    let passedCount = 0;
    let failedCount = 0;
    let index = 0;

    // Create a directory for the user's code
    const tempDir = path.join(process.cwd(), 'temp');
    const userDir = path.join(tempDir, uuidv4());
    await fs.mkdir(userDir, { recursive: true });
    const codeFilePath = path.join(userDir, 'user_code.py');
    await fs.writeFile(codeFilePath, submissionData.code);

    // Run the user's code for each test case
    for (const testCase of testCases) {
      // Prepare arguments for the test case
      const argsJson = testCase.args;
      let args = "";
      Object.keys(challenge.arguments).forEach((argument: string) => {
        if (argsJson !== null) {
          args += `${argsJson[argument]} `;
        }
      });

      let output: string;
      try {
        // Run the command inside the Docker container
        const command = `docker run --rm -v ${userDir}:/code python:3.9 python /code/user_code.py ${args}`;
        output = execSync(command, { encoding: 'utf-8', timeout: 5000 });
      } catch (error: any) {
        output = error.stdout ? error.stdout.toString() : error.message;
      }


      // Determine if the output is correct
      const expectedOutput = testCase.output.toString().trim();
      const isPassed = output.trim() === expectedOutput;

      // Update submission stats
      if (isPassed) {
        passedCount += 1;
      } else {
        failedCount += 1;
      }

      // Make the first 2 test cases visible to the user
      if (index < 2) {
        visibleTestCases.push({
          input: testCase.args,
          expected: testCase.output,
          received: output.trim(),
          result: isPassed,
        });
      }
      index += 1;
    }

    // Determine final result
    const finalResult = failedCount === 0 ? "Passed" : "Failed";

    // Reward the user if the challenge was solved successfully
    if (finalResult === "Passed" && !userChallengeStatus?.solved) {
      const challengePoints = challenge.points;

      // Update user statistics
      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          points: { increment: challengePoints },
          solves: { increment: 1 },
          lastChallenge: "",
          easyChallenges: challenge.difficulty === 'Easy' ? { increment: 1 } : undefined,
          mediumChallenges: challenge.difficulty === 'Medium' ? { increment: 1 } : undefined,
          hardChallenges: challenge.difficulty === 'Hard' ? { increment: 1 } : undefined,
          dailyChallenges: challenge.difficulty === 'Daily' ? { increment: 1 } : undefined,
        },
      });

      // Mark the challenge as solved for the user
      await prismaClient.userChallenges.updateMany({
        where: { userId: user.id, challengeId: challenge.id },
        data: { solved: true },
      });

      // Update challenge-specific statistics
      await prismaClient.challenge.update({
        where: { challengeId: submissionData.challengeId },
        data: { solves: { increment: 1 } },
      });
    }

    // Send back the result to the user
    return NextResponse.json({ result: finalResult, failed: failedCount, total: passedCount + failedCount, status:"success", visibleTestCases });
  } catch (err: any) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}
