import dbConnect from '@/lib/database/dbConnect';
import {User} from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';

// Getting leaderboard
export async function GET(request: NextRequest) {
  try {
    await dbConnect(); // connecting to mongodb

    // Getting all users; TODO: Optimize
    const allUsers = await User.find({});
    // sorting users by greatest to least
    allUsers.sort((a, b) => b.points - a.points);
    return NextResponse.json(allUsers);
  }
  catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }

    // Check if user already exists by id
//     const existingUser = 

//     if (existingUser) {
//       return NextResponse.json(existingUser);
//     } else {
//       // User does not exist, create a new user
//       const newUser = new User({
//         name: data.name,
//         email: data.email,
//         avatar: data.image,
//         id: data.id,
//       });

//       // Save the new user to the database
//       await newUser.save();

//       return NextResponse.json(newUser);
//     }
//   } catch (error:any) {
//     console.error("Error:", error);
//     return new Response(`Error processing request: ${error.message}`, { status: 500 });
//   }
}
