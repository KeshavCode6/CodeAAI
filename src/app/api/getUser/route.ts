import { NextRequest, NextResponse } from 'next/server';
import {getUserFromToken} from "@/lib/getUserFromToken"
import { prismaClient } from '@/lib/prisma';

// handling code submission
export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromToken(request.cookies);
    const dbUser = await prismaClient.user.findUnique({where:{email:user?.email || ""}, select:{points:true, codeLeagueRank:true, solves:true}})
    console.log(user, dbUser)
    return NextResponse.json(dbUser);
  } catch (error:any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
