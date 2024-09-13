import { getAdminUser } from '@/lib/getUserFromToken';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import {ApiErrors} from "@/lib/apiErrors";


// Handling GET request
export async function GET(request: NextRequest) {
  try {
    // check if user is admin based of request session tokens
    const user = await getAdminUser(request.cookies);

    if(!user){
      return new Response(...ApiErrors.UNAUTHORIZED_ACTION);
    }
    
    // gets admin data
    const userDb = await prismaClient.user.findUnique({ where: { email: user?.email || "" }, select: { name:true, points: true, codeLeagueRank: true, solves: true } });

    return NextResponse.json(userDb);
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}