import { deleteExpiredChallenges } from '@/instrumentation';
import dbConnect from '@/lib/database/dbConnect';
import {Challenge} from '@/lib/database/schemas/Challenge';
import { NextRequest, NextResponse } from 'next/server';

// returning challenge list
export async function GET(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    await deleteExpiredChallenges();
    // getting all challenges
    const challenges = await Challenge.find({});
    // removing hints
    challenges.forEach(challenge => {
      delete challenge.hints;
    });

    return NextResponse.json(challenges)

  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
