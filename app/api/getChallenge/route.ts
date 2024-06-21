import dbConnect from '@/lib/database/dbConnect';
import {Challenge} from '@/lib/database/schemas/Challenge';
import { NextRequest, NextResponse } from 'next/server';

// handling code submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    const data = await request.json(); // Assuming request body contains user data
    const challenge = await Challenge.findOne({ id: data.id });

    if (challenge) {
      delete challenge.hints;

      return NextResponse.json(challenge);
    } else {
      return NextResponse.json({result:"Invalid Challenge Id"});
    }
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
