import { prismaClient } from "@/lib/prisma"; // Import the Prisma client
import { NextRequest, NextResponse } from "next/server";
import { getAdminUser } from "@/lib/getUserFromToken";

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    if (reqData.challengeData === undefined) {
      return NextResponse.json({ status: 403 });
    }

    const data = JSON.parse(reqData.challengeData);
    const user = await getAdminUser(request.cookies);
    if (!user) {
      return NextResponse.json({ status: 401, message: "Not allowed" });
    }
    
    const userID = await prismaClient.user.findUnique({ where: { email: user.email || "" } });

    if (!userID) {
      return NextResponse.json({ status: 500, message: "Not logged in" });
    }

    // Validate the structure of test cases
    if (!data.testCases || !Array.isArray(data.testCases)) {
      return NextResponse.json({ status: 400, message: "Invalid test cases format" });
    }

    // Adding initial challenge data
    const newChallenge = await prismaClient.challenge.create({
      data: {
        name: data.name,
        challengeId: data.id,
        description: data.description,
        difficulty: data.difficulty,
        arguments: data.arguments || {},
        points: data.points || 0,
        authorId: userID.id,
        creationTimestamp: new Date(data.creationTimestamp || Date.now()), 
        testCases: {
          create: data.testCases.map((testCase: any) => ({
            args: testCase?.args || [],
            output: testCase?.output || "",
          })),
        },
      },
    });

    // Update stats based on the new challenge's difficulty
    await prismaClient.stats.update({
      where: { id: 1 },
      data: {
        totalPoints: { increment: newChallenge.points },
        totalChallenges: { increment: 1 },
        totalEasyChallenges: newChallenge.difficulty === 'Easy' ? { increment: 1 } : undefined,
        totalMediumChallenges: newChallenge.difficulty === 'Medium' ? { increment: 1 } : undefined,
        totalHardChallenges: newChallenge.difficulty === 'Hard' ? { increment: 1 } : undefined,
        totalDailyChallenges: newChallenge.difficulty === 'Daily' ? { increment: 1 } : undefined,
      },
    });

    return NextResponse.json({ status: 200, newChallenge });
  } catch (error:any) {
    console.error("Error in managing challenge:", error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the challengeId from the request body
    const reqData = await request.json();
    const { challengeId } = reqData;

    if (!challengeId) {
      return NextResponse.json({ status: 400, message: "Challenge ID is required" });
    }

    // Authenticate the admin user
    const user = await getAdminUser(request.cookies);
    if (!user) {
      return NextResponse.json({ status: 401, message: "Not allowed" });
    }

    // Find the challenge by ID to determine its difficulty
    const challenge = await prismaClient.challenge.findUnique({
      where: { challengeId },
      select: { difficulty: true, points: true }, // Only select the fields needed
    });

    if (!challenge) {
      return NextResponse.json({ status: 404, message: "Challenge not found" });
    }

    // Delete the challenge
    const deletedChallenge = await prismaClient.challenge.delete({
      where: { challengeId },
    });

    // Update stats based on the challenge's difficulty
    await prismaClient.stats.update({
      where: { id: 1 },
      data: {
        totalPoints: { increment: -deletedChallenge.points },
        totalChallenges: { increment: -1 },
        totalEasyChallenges: challenge.difficulty === 'Easy' ? { increment: -1 } : undefined,
        totalMediumChallenges: challenge.difficulty === 'Medium' ? { increment: -1 } : undefined,
        totalHardChallenges: challenge.difficulty === 'Hard' ? { increment: -1 } : undefined,
        totalDailyChallenges: challenge.difficulty === 'Daily' ? { increment: -1 } : undefined,
      },
    });

    return NextResponse.json({ status: 200, message: "Challenge deleted", deletedChallenge });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}