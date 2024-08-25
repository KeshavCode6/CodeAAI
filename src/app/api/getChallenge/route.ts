import { NextRequest, NextResponse } from 'next/server';
import {getUserFromToken} from "@/lib/getUserFromToken"
import {prismaClient} from "@/lib/prisma"; // Import the Prisma client

interface PostData {
  challengeId: string;
}

export async function POST(request: NextRequest) {
  try {

    const data: PostData = await request.json(); // getting challenge data

    if (!data.challengeId) {
      return NextResponse.json({ result: "Invalid Challenge Id" });
    }

    // checking if that challenge exists
    const challenge = await Challenge.findOne({ id: data.challengeId });
    const user = (await getUserFromToken(request.cookies));

    const userDb = await prismaClient.user.findUnique({where:{email:user.email}})

    // if it exists, return challenge data
    if (challenge && user) {
      // Check if the challenge is not yet solved and update the status
      if (!user.challenges.has(data.challengeId) || user.challenges.get(data.challengeId) !== "solved") {
        user.challenges.set(data.challengeId, "open");
        user.markModified('challenges'); // Mark the nested field as modified
        await user.save();
      }

      return NextResponse.json(challenge);
    } else {
      return NextResponse.json({ result: "Invalid Challenge Id" });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
