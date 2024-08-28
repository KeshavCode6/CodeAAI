import { getAdminUser } from '@/lib/getUserFromToken';
import { prismaClient } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';


// Handling GET request
export async function GET(request: NextRequest) {
  try {
    const user = await getAdminUser(request.cookies);

    if(!user){
      return new Response(`Not admin!`, { status: 500 });
    }
    
    const dbUser = await prismaClient.user.findUnique({ where: { email: user?.email || "" }, select: { name:true, points: true, codeLeagueRank: true, solves: true } });

    return NextResponse.json(dbUser);
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}