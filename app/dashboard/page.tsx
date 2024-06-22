"use client";
import { Card } from "@/components/ui/card";
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
import PointsTracker from "@/components/custom/charts/PointsTracker";
import {
  MultipleSectionsCircleWithText,
  ProgressCircleWithText,
} from "@/components/custom/charts/ProgressCircle";
import ProfileCard from "@/components/custom/dashboard/ProfileCard";
import { protectedRoute } from "@/lib/protectedRoute";
import axios from "axios";
import { IUser } from "@/lib/database/schemas/User";
import { IChallenge } from "@/lib/database/schemas/Challenge";

//@ts-ignore : has an import error for some reason, TODO: Fix
import HeaderCard from "@/components/custom/card/headercard";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Monitor, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {

  const { status } = protectedRoute(); // auth data
  const [userData, setUserData] = useState<IUser | undefined>(undefined); // logged in users data
  const [leaderboardData, setLeaderboardData] = useState<IUser[] | undefined>(
    undefined
  ); // leaderboard data
  const [challenges, setChallenges] = useState<IChallenge[] | undefined>(
    undefined
  ); // leaderboard data
  const [selectedTab, setSelectedTab] = useState("easy"); // selected tab for filtering challenges
  const [leaderboardFilterSet, setLeaderboardFilterSet] = useState(false);
  const [displayedOnLeaderboard, setDisplayedOnLeaderboard] = useState([]);

  // getting leaderboard error
  useEffect(() => {
    // making sure auth has loaded
    if (status == "loading") {
      return;
    }

    // getting logged in users data
    axios.post("/api/getUser", { withCredentials: true })
      .then(function (response: any) {
        // TODO: Type check
        setUserData(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });

    // getting leaderboard data
    axios
      .get("/api/getLeaderboard")
      .then(function (response: any) {
        // TODO: Type check
        setLeaderboardData(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });

    axios
      .get("/api/getChallengeList")
      .then(function (response: any) {
        // TODO: Type check
        setChallenges(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [status]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const handleLeaderboardFilterChange = (value: string) => {

    setLeaderboardFilterSet(true);

    switch (value) {

      case "all":
        setDisplayedOnLeaderboard(
          //@ts-ignore
          leaderboardData.map((user, index) => (
            <LeaderboardItem
              name={user.name}
              points={user.points.toLocaleString()}
              place={`#${index + 1}`}
              avatar={user.image}
            />
          ))
        )
        break;

      case "around":
        var myPlace: Number;
        leaderboardData?.forEach((user, index) => {
          if (user.id == userData?.id) {
            myPlace = index;
          }
        })
        setDisplayedOnLeaderboard(
          //@ts-ignore
          leaderboardData.map((user, index) => (
            //@ts-ignore
             (Math.abs(index - myPlace) < 3) ? <LeaderboardItem
              name={user.name}
              points={user.points.toLocaleString()}
              place={`#${index + 1}`}
              avatar={user.image}
            /> : ""
          ))
        )
        break;

      default:
        setDisplayedOnLeaderboard(
          //@ts-ignore
          leaderboardData.map((user, index) => (
            (parseInt(value) > index) ? <LeaderboardItem
              name={user.name}
              points={user.points.toLocaleString()}
              place={`#${index + 1}`}
              avatar={user.image}
            /> : ""
          ))
        )
        break;
    }

  }


  if (window.innerWidth < 1680) {
    return (
      <div className="flex flex-col mt-24 p-5 gap-10">
        <Monitor size={200} className="self-center"/>
        <div className="flex flex-col">
          <span className="text-center text-3xl">STOP!</span>
          <span className="text-center mt-3 text-xl w-96 self-center font-thin">This part of the website is best experienced on larger screens.</span>
        </div>
        <div className="flex flex-col gap-3">
          <a href="/" className="self-center">
            <Button className="w-56 flex gap-2">
              <ArrowLeft />
              <span>Return to Home</span>
            </Button>
          </a>
          <a href="/" className="self-center">
            <Button className="w-40 flex gap-2" variant="outline" onClick={() => {
              location.reload();
            }}>
              <RefreshCw/>
              <span>Retry</span>
            </Button>
          </a>
        </div>
      </div>
    )
  }

  // UI
  return (
    <Navigation path="/dashboard">
      <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4 overflow-hidden">
        <div className="flex flex-col h-full gap-1">
          <div className="flex gap-3 h-[27vh]">
            <div className="flex gap-1 ">
              <ProfileCard
                status={status}
                avatar={userData?.image || "/assets/avatar/image.png"}
                name={userData?.name || ""}
                points={`${userData?.points}`}
                ranking="Top 1% - #1/4000"
              />
            </div>
            <Card className="flex p-4 gap-4 px-8 animate-flyBottom">
              <ProgressCircleWithText
                value={50.5}
                className="w-40"
                title="Completion"
              />
              <MultipleSectionsCircleWithText
                values={[10, 30, 40]}
                className="w-40"
                title="Points"
                labels={["Easy", "Medium", "Hard"]}
              />
            </Card>
            <Card className="p-2 w-[25vw] flex flex-col animate-flyBottom">
              <span className="mb-[-1rem] text-sm self-center mt-3">
                Points Over Time
              </span>
              <PointsTracker className="self-center" />
            </Card>
          </div>
          <div className="flex mt-2 gap-3 justify-center items-center grow">
            <HeaderCard
              header="Challenges"
              className="h-full animate-flyRight"
              footer={
                <Tabs
                  defaultValue="easy"
                  className="absolute right-2 bottom-2"
                  onValueChange={handleTabChange}
                >
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
                  {challenges?.map((value, index) => {
                    if (
                      value.difficulty.toLowerCase() ==
                      selectedTab.toLowerCase()
                    ) {
                      //@ts-ignore TODO: Fix
                      let status = userData?.challenges[value.id] || "unopened";
                      status = status[0].toUpperCase() + status.slice(1);
                      return (
                        <ChallengeListItem
                          id={value.id}
                          key={value.id}
                          name={value.name}
                          status={status}
                          difficulty={value.difficulty}
                          points={value.points.toString()}
                        />
                      );
                    }
                  })}
                </ChallengeList>
              </div>
            </HeaderCard>
            <HeaderCard
              className="h-full w-[20vw] animate-flyTop"
              header="Daily Challenges"
            >
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
        <HeaderCard
          header="Leaderboard"
          className="w-30 max-w-96 animate-flyLeft ml-1 h-full"
          footer={
            <Select onValueChange={handleLeaderboardFilterChange}>
            <SelectTrigger className="absolute bottom-0 right-0 w-40 m-2">
              <SelectValue placeholder="Select a filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filters</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="around">Around me</SelectItem>
                <SelectItem value="5">Top 5</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
                <SelectItem value="100">Top 100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          }
        >
          <Leaderboard>
            {(leaderboardFilterSet) ? displayedOnLeaderboard : (
              leaderboardData?.map((user, index) => (
                <LeaderboardItem
                  name={user.name}
                  points={user.points.toLocaleString()}
                  place={`#${index + 1}`}
                  avatar={user.image}
                />
              ))
            )
            }
          </Leaderboard>

        </HeaderCard>

      </div>
    </Navigation>
  );
}
