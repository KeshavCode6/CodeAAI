import { getUserFromToken } from '@/lib/getUserFromToken';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the difficulty level
    const data = await request.json();
    const { difficulty } = data;

    console.log(data)
    // Get the user from the token in the cookies
    const user = await getUserFromToken(request.cookies);
    if (!user) {
      // Return a 401 Unauthorized if the token is invalid
      return NextResponse.json({ error: "Invalid user token" }, { status: 401 });
    }

    // Fetch the user from the database using their email
    const userDb = await prismaClient.user.findUnique({
      where: { email: user.email || "" }
    });

    if (!userDb) {
      // Return a 404 Not Found if the user does not exist in the database
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Ensure that the difficulty parameter was provided
    if (!difficulty) {
      return NextResponse.json({ error: "Difficulty parameter is required" }, { status: 400 });
    }

    // Fetch challenges based on the difficulty level
    const challenges = await prismaClient.challenge.findMany({
      where: { difficulty }
    });

    // Extract challenge IDs to fetch the corresponding test cases
    const challengeIds = challenges.map(challenge => challenge.id);

    // Fetch test cases for the challenges
    const testCases = await prismaClient.testCase.findMany({
      where: { challengeId: { in: challengeIds } }
    });

    // Map the test cases to their respective challenges
    const formattedChallenges = challenges.map(challenge => {
      const challengeTestCases = testCases.filter(testCase => testCase.challengeId === challenge.id);

      return {
        ...challenge,
        testCases: challengeTestCases // Attach the test cases to the respective challenge
      };
    });

    console.log(formattedChallenges)

    // Return the formatted challenges with their test cases
    return NextResponse.json(formattedChallenges);

  } catch (error: any) {
    // Handle any errors that occur during the execution
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
