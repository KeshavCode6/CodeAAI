import dbConnect from '@/lib/database/dbConnect';
import {User} from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/getUserFromToken';

// handling code submission
export async function POST(request: NextRequest) {

  try {
    await dbConnect();
    let data = await request.json();
    
    //@ts-ignore
    const userId = (await getUserFromToken(request.cookies)).user.id;

    const {name} = data;
    
    await User.findOneAndUpdate({"id": userId}, {name});

    return NextResponse.json({status: "ok"});
  }

  catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }

}
