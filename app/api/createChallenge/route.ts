import dbConnect from "@/lib/database/dbConnect";
import Challenge, { IChallenge } from "@/lib/database/schemas/Challenge";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/lib/getUserFromToken";

export async function POST(request: NextRequest) {

    try {

        await dbConnect();

        const reqData = await request.json();

        if(reqData.secretKey != "i_love_making_challenges_38255") {
            return NextResponse.json({ status: 403 });
        }

        if(reqData.challengeData == undefined) {
            return NextResponse.json({ status: 403 });
        }

        const data = JSON.parse(reqData.challengeData);
        data.solves = 0;
        data.creationTimestamp = new Date().getTime();
        
        //@ts-ignore
        const userEmail = (await getUserFromToken(request.cookies)).user.id;
        data.authorId = userEmail;
        await new Challenge(data).save();
        console.log(data)

        return NextResponse.json({ status: 200 });
    }
    catch (error:any){
        console.error(error)
        return NextResponse.json({ status: 500 });
    }
}