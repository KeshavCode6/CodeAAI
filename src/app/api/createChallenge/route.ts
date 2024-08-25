import {prismaClient} from "@/lib/prisma"; // Import the Prisma client
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import {getUserFromToken} from "@/lib/getUserFromToken"
export async function POST(request: NextRequest) {
  try {
    const reqData = await request.json();

    // Uncomment and adjust this section if you need secret key verification
    // if (crypto.createHash('sha1').update(reqData.secretKey).digest('hex') !== process.env.CHALLENGE_CREATION_SECRET_KEY_HASH) {
    //   return NextResponse.json({ status: 403 });
    // }

    if (reqData.challengeData === undefined) {
      return NextResponse.json({ status: 403 });
    }

    const data = JSON.parse(reqData.challengeData);
    const user = await getUserFromToken(request.cookies);

    const userID = (await prismaClient.user.findUnique({where:{email:user.email}}))?.id;
    // Adding initial challenge data
    const newChallenge = await prismaClient.challenge.create({
      data: {
        name: data.name,
        description: data.description,
        difficulty: data.difficulty,
        arguments: data.arguments || [],
        points: data.points || 0,
        isDaily: data.isDaily || false,
        authorId: userID,
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
