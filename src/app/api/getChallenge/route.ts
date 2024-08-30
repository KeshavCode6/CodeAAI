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
    const challengeData = await prismaClient.challenge.findUnique({where:{ challengeId: data.challengeId }});

    if(!challengeData){
      return NextResponse.json({ result: "Invalid Challenge" });
    }

    const user = await getUserFromToken(request.cookies);
    if(!user){
      return NextResponse.json({ result: "Invalid user token?" });
    }

    const userDb = await prismaClient.user.findUnique({where:{email:user.email || ""}})
    const userChallengeData = await prismaClient.userChallenges.findFirst({where:{challengeId:data.challengeId, userId:userDb?.id || ""}})

    if(!challengeData){
      return NextResponse.json({ result: "No challenge data?" });
    }

    if(!userChallengeData && userDb){
      await prismaClient.userChallenges.create({data:{userId:userDb.id, challengeId:challengeData.id, solved:false}})
    }

    const author = await prismaClient.user.findUnique({where:{ id: challengeData.authorId}});
    const name = {name:author?.name || "Unknown"};

    if(!userChallengeData?.solved){
      await prismaClient.user.update({
        where: { id: userDb?.id },
        data: {
          lastChallenge:challengeData.challengeId
        },
      });
    }

    const response = {
      challengeData,
      userChallengeData,
      name
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}