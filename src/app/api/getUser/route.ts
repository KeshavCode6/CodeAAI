import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser, getUserFromToken } from "@/lib/getUserFromToken";
import { prismaClient } from '@/lib/prisma';

// Handling GET request
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request.cookies);
    const dbUser = await prismaClient.user.findUnique({ where: { email: user?.email || "" }, select: {
       points: true, codeLeagueRank: true, name:true, solves: true, image:true, lastChallenge:true, easyChallenges:true, hardChallenges:true, mediumChallenges:true, dailyChallenges:true} 
    });
    const stats = await prismaClient.stats.findUnique({where:{id:1}})

    const combinedResponse = {
      ...dbUser, // Spread dbUser properties
      ...stats   // Spread stats properties
    };


    return NextResponse.json(combinedResponse);
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}

// Handling POST request
export async function POST(request: NextRequest) {
  try {
    const user = await getAdminUser(request.cookies);
    const data = await request.json();
    
    if (!user) {
      return new Response("Not admin!", { status: 400 });
    }

    if (!data.email) {
      return new Response("User email is required", { status: 400 });
    }

    // Query all fields from the User model
    const dbUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!dbUser) {
      return new Response("User not found", { status: 404 });
    }

    return NextResponse.json(dbUser);
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}

// Handling PUT request for updating user data
export async function PUT(request: NextRequest) {
  try {
    const user = await getAdminUser(request.cookies);
    const jData = await request.json();
    
    if (!user) {
      return new Response("Not admin!", { status: 400 });
    }

    if (!jData.email) {
      return new Response("User email is required", { status: 400 });
    }

    const { email, data } = jData;
    
    

    const updatedUser = await prismaClient.user.update({
      where: { email },
      data: JSON.parse(data),
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
