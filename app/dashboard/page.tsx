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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//@ts-ignore : has an import error for some reason, TODO: Fix
import HeaderCard from "@/components/custom/card/headercard";
import ScreenTooSmall from "@/components/custom/ScreenTooSmall";

export default function Dashboard() {
  const { session, status } = protectedRoute(); // auth data
  const [userData, setUserData] = useState<IUser | undefined>(undefined); // logged in users data
  const [leaderboardData, setLeaderboardData] = useState<IUser[] | undefined>(undefined); // leaderboard data
  const [challenges, setChallenges] = useState<IChallenge[] | undefined>(undefined); // leaderboard data
  const [selectedTab, setSelectedTab] = useState("easy"); // selected tab for filtering challenges
  const [leaderboardFilterSet, setLeaderboardFilterSet] = useState(false); // settings filters
  const [displayedOnLeaderboard, setDisplayedOnLeaderboard] = useState([]); 
  const [completionPercentage, setCompletionPercentage] = useState(0.0);
  const [pointsPercentage, setPointsPercentage] = useState(0.0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // getting leaderboard error
  useEffect(() => {
    // making sure auth has loaded
    if (status == "loading") {
      return;
    }

    if (window != undefined) {

      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      // Add event listener to update window width on resize
      window.addEventListener('resize', handleWindowResize);

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

  // Handling the challenge filter changes
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  // Filters
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

  const getCompletionPercentage = ()=>{
    let solves = 0;

    if(typeof userData?.challenges === "undefined"){
      return;
    }

    Object.keys(userData?.challenges).forEach((element:any)  => {
      //@ts-ignore
      if(userData?.challenges[element] == "solved"){
        solves +=1
      }
    });
    
    if(typeof challenges?.length!=="undefined"){
      if(challenges?.length>0){
        setCompletionPercentage(Math.round((solves/challenges?.length)*100 * 100) / 100)
      }
      else{
        setCompletionPercentage(0);
      }

      let totalPoints = 0;
      challenges.forEach(element => {
        totalPoints+=element.points
      });

      if(totalPoints<=0){totalPoints=1}

      console.log(totalPoints);
      setPointsPercentage(Math.round((userData?.points/totalPoints * 100) * 100) / 100)
    }
  }
  

  // If screen is too small
  if(windowWidth < 1680) {
    return <ScreenTooSmall/>
  }

  // setting up charts to work
  useEffect(() => {
    getCompletionPercentage();
  }, [userData, challenges])

  const wasInLastDay = (timestamp: number) => {

    const currentTime = Date.now();

    const difference = currentTime - timestamp;
    const twentyFourHoursInMs = 24 * 60 * 60 * 1000;

    return difference > twentyFourHoursInMs;

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
                value={completionPercentage}
                className="w-40"
                title="Completion"
              />
              <ProgressCircleWithText
                value={pointsPercentage}
                className="w-40"
                title="Points"
              />
            </Card>
            <Card className="relative p-2 w-[25vw] flex flex-col animate-flyBottom">
              <span className="mb-[-1rem] text-sm self-center mt-3">
                Points Over Time
              </span>
              <PointsTracker pointData={userData?.pointsOverTime} className="self-center" />
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
                  {challenges?.map((challenge, index) => {
                    if (
                      challenge.difficulty.toLowerCase() ==
                      selectedTab.toLowerCase()
                    ) {
                      //@ts-ignore TODO: Fix
                      let status = userData?.challenges[challenge.id] || "unopened";
                      status = status[0].toUpperCase() + status.slice(1);
                      return (!challenge.isDaily) ? (
                        <ChallengeListItem
                          index = {index}
                          id={challenge.id}
                          key={challenge.id}
                          name={challenge.name}
                          status={status}
                          difficulty={challenge.difficulty}
                          points={challenge.points.toString()}
                        />
                      ) : <></>;
                    }
                  })}
                </ChallengeList>
              </div>
            </HeaderCard>
            <HeaderCard
              className="w-30 animate-flyTop ml-1 h-full"
              header="Daily Challenges"
            >
              <DailyChallengeList>
                {challenges?.map((challenge, index) => (
                  (challenge.isDaily) ? <DailyChallengeListItem
                    name={challenge.name}
                    solves={challenge.solves || 0}
                    difficulty={challenge.difficulty}
                    points={challenge.points.toString()}
                    id={challenge.id}
                  /> : <></>
                ))}
               </DailyChallengeList>
            </HeaderCard>
          </div>
        </div>
        <HeaderCard
          header="Leaderboard"
          className="w-30 max-w-[25vw] animate-flyLeft ml-1"
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
