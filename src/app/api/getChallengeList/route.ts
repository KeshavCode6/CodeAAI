import { getUserFromToken } from '@/lib/getUserFromToken';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const difficulty = data.difficulty;

    const user = await getUserFromToken(request.cookies);
    if (!user) {
      return NextResponse.json({ error: "Invalid user token" }, { status: 401 });
    }

    const userDb = await prismaClient.user.findUnique({ where: { email: user.email || "" } });
    if (!userDb) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!difficulty) {
      return NextResponse.json({ error: "Difficulty parameter is required" }, { status: 400 });
    }

    // Fetch challenges based on difficulty
    const challenges = await prismaClient.challenge.findMany({
      where: { difficulty: difficulty },
      select: {
        id: true,
        challengeId: true,
        points: true,
        difficulty: true,
        solves: true,
        name: true,
      },
    });

    // Fetch user challenges for the current user
    const userChallenges = await prismaClient.userChallenges.findMany({
      where: {
        userId: userDb.id,
        challengeId: { in: challenges.map(c => c.id) }
      }
    });

    // Map through challenges and determine status
    const formattedChallenges = challenges.map(challenge => {
      const userChallenge = userChallenges.find(uc => uc.challengeId === challenge.id);
      let status = 'Unopened'; 

      if (userChallenge) {
        status = userChallenge.solved ? 'Completed' : 'Opened'; 
      }

      return {
        ...challenge,
        status
      };
    });
    
    return NextResponse.json(formattedChallenges);

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}