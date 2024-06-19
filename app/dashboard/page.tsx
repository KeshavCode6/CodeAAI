"use client";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChallengeList,
  ChallengeListItem,
} from "@/components/custom/dashboard/challenge";
import Leaderboard, {
  LeaderboardItem,
} from "@/components/custom/dashboard/leaderboard";
import HeaderCard from "@/components/custom/card/headercard";
import CardWithProgressionChart from "@/components/custom/card/cardWithProgressionChart";
import PointsTracker from "@/components/custom/charts/PointsTracker";
import useWindowSize from "@/lib/useWindowSize";

export default function Dashboard() {  
  return (
    <Navigation path={"/dashboard"}>
      <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4">
        <div className="flex flex-col h-full gap-1">
          <div className="flex  gap-1 h-[27vh]">
            <div className="flex gap-1 ">
              <CardWithProgressionChart text="Compleition" value={80.9} />
              <CardWithProgressionChart text="Compleition" value={80.9} />
              <CardWithProgressionChart text="Points" value={80.9} />
            </div>
            <Card className="p-4 w-[25vw]">
              <PointsTracker />
            </Card>
          </div>
          <div className="flex mt-2 gap-1 justify-center items-center grow">
            <HeaderCard
              header="Challenges"
              className="h-full"
              footer={
                <Tabs defaultValue="easy" className="absolute right-2 bottom-2">
                  <TabsList>
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                    <TabsTrigger value="pinned">Pinned</TabsTrigger>
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
            <HeaderCard className="h-full w-[20vw]"></HeaderCard>
          </div>
        </div>
        <HeaderCard header="Leaderboard">
          <Leaderboard>
            <LeaderboardItem name="Keshav Shah" points="100k" place="#1" />
          </Leaderboard>
        </HeaderCard>
      </div>
    </Navigation>
  );
}
