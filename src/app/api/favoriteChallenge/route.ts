import dbConnect from "@/lib/database/dbConnect";
import Challenge from "@/lib/database/schemas/Challenge";
import User from "@/lib/database/schemas/User";
import { getUserFromToken } from "@/lib/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    try {

        const reqData = await request.json();

        const {challengeId} = reqData;

        await dbConnect();

        const userToken = await getUserFromToken(request.cookies);

        //@ts-ignore
        const user = await User.findOne({id: userToken.user.id});

        const challengeWithId = await Challenge.findOne({id: challengeId});

        if (challengeWithId != null && !challengeWithId.isDaily) {
            
            if (user.favoritedChallenges.includes(challengeId)) {
                user.favoritedChallenges.splice(user.favoritedChallenges.indexOf(challengeId), 1)
            }

            else {
                user.favoritedChallenges.push(challengeId)
            }

            await user.save();

            return NextResponse.json({ status: "ok" });

        }

        else {
            return new Response("Invalid challenge ID!", { status: 500 });
        }

    }

    catch (error: any) {
        console.error("Error:", error);
        return new Response(`Error processing request: ${error.message}`, { status: 500 });
    }

}