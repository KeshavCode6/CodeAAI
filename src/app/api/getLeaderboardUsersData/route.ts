import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/lib/prisma';
import {ApiErrors} from "@/lib/apiErrors";

// Handling GET request
export async function GET(request: NextRequest) {
  try {
    const dbUsers = await prismaClient.user.findMany({});
    
    return NextResponse.json(dbUsers);
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}