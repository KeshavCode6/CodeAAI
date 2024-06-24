//@ts-nocheck
import dbConnect from '@/lib/database/dbConnect';
import {User} from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';
import {getUserFromToken} from "@/lib/getUserFromToken"

// handling code submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB
    const data = await request.json(); // user data

    // Check if user exists by id
    const existingUser = await User.findOne({ id: data.id });

    // if exsits, return data
    if (existingUser) {
      return NextResponse.json({name:existingUser.name, email:existingUser.email});
    } else {
      return NextResponse.json({});
    }
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
