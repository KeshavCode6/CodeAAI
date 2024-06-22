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
    const userId = (await getUserFromToken(request.cookies)).user.id;
    const user = (await getUserFromToken(request.cookies)).user;

    // Check if user already exists by id
    const existingUser = await User.findOne({ id: userId });

    // if exsits, return data
    if (existingUser) {
      return NextResponse.json(existingUser);
    } else {
      // User does not exist, create a new user

      const newUser = new User({
        name: user.name,
        email: user.email,
        image: user.image,
        id: userId,
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
