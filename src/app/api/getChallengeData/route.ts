import { NextRequest, NextResponse } from 'next/server';
import {getUserFromToken} from "@/lib/getUserFromToken";
import {prismaClient} from "@/lib/prisma"; // Import the Prisma client
import {ApiErrors} from "@/lib/apiErrors";

interface PostData {
  challengeId: string;
}

export async function POST(request: NextRequest) {
  try {

    const data: PostData = await request.json(); // getting challenge data

    // check if there is an id
    if (!data.challengeId) {
      return NextResponse.json(...ApiErrors.INVALID_CHALLENGE_ID);
    }

    // checking if that challenge exists
    const challengeData = await prismaClient.challenge.findUnique({where:{ challengeId: data.challengeId }});

    // making sure challenge data exists
    if(!challengeData){
      return NextResponse.json(...ApiErrors.INVALID_CHALLENGE_DATA);
    }

    // making sure user is logged in 
    const requestUserAuthData = await getUserFromToken(request.cookies);
    
    if (!requestUserAuthData) {
      return NextResponse.json(...ApiErrors.REQUEST_USER_NOT_LOGGED_IN);
    }

    // getting the user's status on the current challenge and also getting the user's database data
    const requestUserData = await prismaClient.user.findUnique({where:{email:requestUserAuthData.email || ""}})
    const requestUserChallengeData = await prismaClient.userChallenges.findFirst({where:{challengeId:data.challengeId, userId:requestUserData?.id || ""}})

    // creating user challenge data if this is the first time the user has oopened the challenge
    if(!requestUserChallengeData && requestUserData){
      await prismaClient.userChallenges.create({data:{userId:requestUserData.id, challengeId:challengeData.id, solved:false}})
    }

    // getting the author of the challenge
    const challengeAuthorData = await prismaClient.user.findUnique({where:{ id: challengeData.authorId}});
    const challengeAuthorName = challengeAuthorData?.name || "Unknown";
    
    // updating the user's active challenge in the database if this challenge is not solved
    if(!requestUserChallengeData?.solved){
      await prismaClient.user.update({
        where: { id: requestUserData?.id },
        data: {
          lastChallenge:challengeData.challengeId
        },
      });
    }

    challengeData.authorName = challengeAuthorName

    // returning response
    const response = {  
      challengeData,
      requestUserChallengeData,
    };

    return NextResponse.json(response);

  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}