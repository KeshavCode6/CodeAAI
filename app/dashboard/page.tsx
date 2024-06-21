"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChallengeList,
  ChallengeListItem,
  DailyChallengeList,
  DailyChallengeListItem,
} from "@/components/custom/dashboard/challenge";
import Leaderboard, {
  LeaderboardItem,
} from "@/components/custom/dashboard/leaderboard";
import HeaderCard from "@/components/custom/card/headercard";
import PointsTracker from "@/components/custom/charts/PointsTracker";
import {MultipleSectionsCircleWithText, ProgressCircleWithText} from "@/components/custom/charts/ProgressCircle";
import ProfileCard from "@/components/custom/dashboard/ProfileCard";
import { protectedRoute } from "@/lib/protectedRoute";
import axios from "axios";
import { IUser } from "@/lib/database/schemas/User";

export default function Dashboard() {  
  const {session, status} = protectedRoute();
  const [userData, setUserData] = useState<IUser | undefined>(undefined);

  useEffect(()=>{
    if(status=="loading"){
      return;
    }
    axios.post('/api/getUser', session?.user)
    .then(function (response:any) {
      setUserData(response.data);
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }, [status])

  return (
    <Navigation path="/dashboard">
      <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4 overflow-hidden">
        <div className="flex flex-col h-full gap-1">
          <div className="flex gap-3 h-[27vh]">
            <div className="flex gap-1 ">
            <ProfileCard status={status} avatar={session?.user?.image ||"/assets/avatar/image.png" } name={session?.user?.name || ""} points={`${userData?.points}`} ranking="Top 1% - #1/4000"/>
            </div>
            <Card className="flex p-4 gap-4 px-8 animate-flyBottom">
              <ProgressCircleWithText value={50.5} className="w-40" title="Completion"/>
              <MultipleSectionsCircleWithText values={[10, 30, 40]} className="w-40" title="Points" labels={["Easy", "Medium", "Hard"]}/>
            </Card>
            <Card className="p-2 w-[25vw] flex flex-col animate-flyBottom">
              <span className="mb-[-1rem] text-sm self-center mt-3">Points Over Time</span>
              <PointsTracker className="self-center"/>
            </Card>
          </div>
          <div className="flex mt-2 gap-3 justify-center items-center grow">
            <HeaderCard
              header="Challenges"
              className="h-full animate-flyRight"
              footer={
                <Tabs defaultValue="easy" className="absolute right-2 bottom-2">
                  <TabsList>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                    <TabsTrigger value="favorited">Favorites</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              <div className="relative w-full border-t-2 border-slate-900">
                <ChallengeList>
                  <ChallengeListItem
                    name="Merge Sort"
                    status="Opened"
                    difficulty="Easy"
                    points="100k"
                  />
                </ChallengeList>
              </div>
            </HeaderCard>
            <HeaderCard className="h-full w-[20vw] animate-flyTop" header="Daily Challenges">
              <DailyChallengeList>
                  <DailyChallengeListItem
                    name="Merge Sort"
                    solves="100k"
                    difficulty="Easy"
                    points="100k"
                  />
                  <DailyChallengeListItem
                    name="Merge Sort"
                    solves="100k"
                    difficulty="Medium"
                    points="100k"
                  />
                  <DailyChallengeListItem
                    name="Merge Sort"
                    solves="100k"
                    difficulty="Hard"
                    points="100k"
                  />
                </DailyChallengeList>
            </HeaderCard>
          </div>
        </div>
        <HeaderCard header="Leaderboard" className="w-30 max-w-96 animate-flyLeft ml-1">
          <Leaderboard>
            <LeaderboardItem name="Keshav Shah" points="100k" place="#1" />
          </Leaderboard>
        </HeaderCard>
      </div>
    </Navigation>
  );
}
