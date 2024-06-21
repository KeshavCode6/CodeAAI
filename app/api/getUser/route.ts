import dbConnect from '@/lib/database/dbConnect';
import {User} from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';

// handling code submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    const data = await request.json(); // user data
    // ensuring data has id field
    if(typeof data.id =="undefined"){
      return NextResponse.json({result:"Invalid Challenge Id"});
    }

    // Check if user already exists by id
    const existingUser = await User.findOne({ id: data.id });

    // if exsits, return data
    if (existingUser) {
      return NextResponse.json(existingUser);
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        name: data.name,
        email: data.email,
        image: data.image,
        id: data.id,
      });

      // Save the new user to the database
      await newUser.save();

      // return user
      return NextResponse.json(newUser);
    }
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
