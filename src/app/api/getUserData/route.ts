import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser, getUserFromToken } from "@/lib/getUserFromToken";
import { prismaClient } from '@/lib/prisma';
import {ApiErrors} from "@/lib/apiErrors";

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
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}

// Handling POST request
export async function POST(request: NextRequest) {
  try {
    const user = await getAdminUser(request.cookies);
    const data = await request.json();
    
    if (!user) {
      return new Response(...ApiErrors.UNAUTHORIZED_ACTION);
    }

    if (!data.email) {
      return new Response(...ApiErrors.MISSING_REQUEST_PARAMETERS);
    }

    // Query all fields from the User model
    const dbUser = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!dbUser) {
      return new Response(...ApiErrors.INVALID_USER_DATA);
    }

    return NextResponse.json(dbUser);
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}

// Handling PUT request for updating user data
export async function PUT(request: NextRequest) {
  try {
    const user = await getAdminUser(request.cookies);
    const jData = await request.json();
    
    if (!user) {
      return new Response(...ApiErrors.UNAUTHORIZED_ACTION);
    }

    if (!jData.email) {
      return new Response(...ApiErrors.MISSING_REQUEST_PARAMETERS);
    }

    const { email, data } = jData;
    
    

    const updatedUser = await prismaClient.user.update({
      where: { email },
      data: JSON.parse(data),
    });

    return NextResponse.json(updatedUser);
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}
