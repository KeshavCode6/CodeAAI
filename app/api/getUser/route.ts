import dbConnect from '@/lib/database/dbConnect';
import {User} from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';

// handling code submission
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB

    const data = await request.json(); // Assuming request body contains user data

    // Check if user already exists by id
    const existingUser = await User.findOne({ id: data.id });
    if (existingUser) {
      return NextResponse.json(existingUser);
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        name: data.name,
        email: data.email,
        avatar: data.image,
        id: data.id,
      });

      // Save the new user to the database
      await newUser.save();

      return NextResponse.json(newUser);
    }
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
