import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';

// Handling GET request
export async function GET(request: NextRequest) {
  try {
    const dbUsers = await prismaClient.user.findMany({});
    
    return NextResponse.json(dbUsers);
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}