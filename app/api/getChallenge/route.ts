import dbConnect from '@/lib/database/dbConnect';
import {Challenge} from '@/lib/database/schemas/Challenge';
import { NextRequest, NextResponse } from 'next/server';

// handling code submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB
    
    const data = await request.json(); // getting challenge data

    // ensuring data has id field
    if(typeof data.id =="undefined"){
      return NextResponse.json({result:"Invalid Challenge Id"});
    }

    // checking if that challenge exists
    const challenge = await Challenge.findOne({ id: data.id });

    // if it exists, return challenge data
    if (challenge) {
      delete challenge.hints; // make sure user does not have access to the hints
      return NextResponse.json(challenge);
    } else {
      return NextResponse.json({result:"Invalid Challenge Id"});
    }
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
