import { getUserFromToken } from '@/lib/getUserFromToken';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import {ApiErrors} from "@/lib/apiErrors";

export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    const challengeDifficulty = requestData.difficulty;

    // checking if the user is logged in
    const user = await getUserFromToken(request.cookies);
    if (!user) {
      return NextResponse.json(...ApiErrors.REQUEST_USER_NOT_LOGGED_IN);
    }

    const userDb = await prismaClient.user.findUnique({ where: { email: user.email || "" } });
    if (!userDb) {
      return NextResponse.json(...ApiErrors.INVALID_USER_DATA);
    }

    if (!challengeDifficulty) {
      return NextResponse.json(...ApiErrors.MISSING_REQUEST_PARAMETERS);
    }

    // Fetch challenges based on difficulty
    const challenges = await prismaClient.challenge.findMany({
      where: { difficulty: challengeDifficulty },
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

  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}