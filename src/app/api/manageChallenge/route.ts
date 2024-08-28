import {prismaClient} from "@/lib/prisma"; // Import the Prisma client
import { NextRequest, NextResponse } from "next/server";
import {getAdminUser, getUserFromToken} from "@/lib/getUserFromToken"

export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    if (reqData.challengeData === undefined) {
      return NextResponse.json({ status: 403 });
    }

    const data = JSON.parse(reqData.challengeData);
    const user = await getAdminUser(request.cookies);
    if(!user){
      return NextResponse.json({ status: 401, message: "Not allowed?" });
    }
    const userID = await prismaClient.user.findUnique({where:{email:user.email || ""}})

    if(!userID){
      return NextResponse.json({ status: 500, message: "Not logged in?" });

    }
    // Adding initial challenge data
    const newChallenge = await prismaClient.challenge.create({
      data: {
        name: data.name,
        challengeId:data.id,
        description: data.description,
        difficulty: data.difficulty,
        arguments: data.arguments || [],
        points: data.points || 0,
        isDaily: data.isDaily || false,
        authorId: userID.id,
        creationTimestamp: new Date(data.creationTimestamp || Date.now()), // set creation timestamp
        // Assuming testCases is passed as an array
        testCases: {
          create: data.testCases.map((testCase: any) => ({
            args: testCase.args,
            output: testCase.output,
          })),
        },
      },
    });

    return NextResponse.json({ status: 200, newChallenge });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the challengeId from the request body (or it could come from the query string)
    const reqData = await request.json();

    const { challengeId } = reqData;

    if (!challengeId) {
      return NextResponse.json({ status: 400, message: "Challenge ID is required" });
    }

    // Authenticate the admin user
    const user = await getAdminUser(request.cookies);
    if (!user) {
      return NextResponse.json({ status: 401, message: "Not allowed" });
    }

    // Find the challenge by ID and delete it
    const deletedChallenge = await prismaClient.challenge.delete({
      where: { challengeId },
    });

    return NextResponse.json({ status: 200, message: "Challenge deleted", deletedChallenge });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
