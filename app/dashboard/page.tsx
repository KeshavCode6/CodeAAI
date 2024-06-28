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
import { useProtectedRoute } from "@/lib/protectedRoute";
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
import {useScreenSizeCheck} from "@/lib/useScreenSizeCheck"
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { wasInLastDay } from "@/lib/wasInLastDay";

export default function Dashboard() {
  const { session, status } = useProtectedRoute(); // auth data
  const [userData, setUserData] = useState<IUser | undefined>(undefined); // logged in users data
  const [leaderboardData, setLeaderboardData] = useState<IUser[] | undefined>(
    undefined
  ); // leaderboard data
  const [challenges, setChallenges] = useState<IChallenge[] | undefined>(
    undefined
  ); // leaderboard data
  const [selectedTab, setSelectedTab] = useState("easy"); // selected tab for filtering challenges
  const [leaderboardFilterSet, setLeaderboardFilterSet] = useState(false); // settings filters
  const [displayedOnLeaderboard, setDisplayedOnLeaderboard] = useState([]);
  const [completionPercentage, setCompletionPercentage] = useState(0.0);
  const [pointsPercentage, setPointsPercentage] = useState(0.0);
  const [leaderboardRank, setLeaderboardRank] = useState(0);



  const getChallengeList = () => {
    axios
      .get("/api/getChallengeList")
      .then(function (response: any) {
        // TODO: Type check
        setChallenges(response.data);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  const getUserData = () => {
    axios
      .post("/api/getUser", { withCredentials: true })
      .then(function (response: any) {
        // TODO: Type check
        setUserData(response.data);
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };
  // getting leaderboard error
  useEffect(() => {
    // making sure auth has loaded
    if (status == "loading") {
      return;
    }

    // getting logged in users data
    getUserData();

    // getting leaderboard data
    axios
      .get("/api/getLeaderboard")
      .then(function (response: any) {
        // TODO: Type check
        setLeaderboardData(response.data);
        leaderboardData?.forEach((user, index) => {
          if (user.id == userData?.id) {
            setLeaderboardRank(index);
          }
        });
      })
      .catch(function (error: any) {
        console.error(error);
      });
    getChallengeList();
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
              key={index}
              name={user.name}
              points={user.points.toLocaleString()}
              place={`#${index + 1}`}
              avatar={user.image}
            />
          ))
        );
        break;

      case "around":
        
        setDisplayedOnLeaderboard(
          //@ts-ignore
          leaderboardData.map((user, index) =>
            //@ts-ignore
            Math.abs(index - leaderboardRank) < 3 ? (
              <LeaderboardItem
                key={index}
                name={user.name}
                points={user.points.toLocaleString()}
                place={`#${index + 1}`}
                avatar={user.image}
              />
            ) : (
              ""
            )
          )
        );
        break;

      default:
        setDisplayedOnLeaderboard(
          //@ts-ignore
          leaderboardData.map((user, index) =>
            parseInt(value) > index ? (
              <LeaderboardItem
              key={index}
                name={user.name}
                points={user.points.toLocaleString()}
                place={`#${index + 1}`}
                avatar={user.image}
              />
            ) : (
              ""
            )
          )
        );
        break;
    }
  };

  const getCompletionPercentage = () => {
    let solves = 0;

    if (typeof userData?.challenges === "undefined") {
      return;
    }

    if (typeof challenges?.length !== "undefined") {
      if(challenges.length<0){return;}
      let ids :string[] = []
      challenges.forEach(element => {
        ids.push(element.id)
      });

      Object.keys(userData?.challenges || {}).forEach((element: any) => {
        if (
          ids.includes(element) &&
          //@ts-ignore
          userData?.challenges[element] === "solved"
        ) {
          solves += 1;
        }
      });
      if (challenges?.length > 0) {
        setCompletionPercentage(
          Math.round((solves / challenges?.length) * 100 * 100) / 100
        );
      } else {
        setCompletionPercentage(0);
      }

      let totalPoints = 0;
      challenges.forEach((element) => {
        if (!element.isDaily) {
          totalPoints += element.points;
        }
      });

      if (totalPoints <= 0) {
        totalPoints = 1;
      }

      setPointsPercentage(
        Math.round((userData?.points / totalPoints) * 100 * 100) / 100
      );
    }
  };

  const favoriteChallenge = (id: string) => {
    axios
      .post(
        "/api/favoriteChallenge",
        { challengeId: id },
        { withCredentials: true }
      )
      .then(function (response: any) {
        getUserData();
      })
      .catch(function (error: any) {
        console.error(error);
      });
  };

  // setting up charts to work
  useEffect(() => {
    getCompletionPercentage();
  }, [userData, challenges]);

  // UI
  return (
    <Navigation path="/dashboard">
      <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4 overflow-hidden">
        <div className="flex flex-col h-full gap-1">
          <div className="flex gap-3 h-[27vh]">
            <div className="flex gap-1 ">
              <ProfileCard
                status={status}
                avatar={userData?.image || "/assets/default-avatar.jpeg"}
                name={userData?.name || ""}
                points={`${userData?.points}`}
                ranking={`Top ${Math.ceil(((leaderboardRank+1) / (leaderboardData?.length || 1)) * 100)}% - #${leaderboardRank+1}/${leaderboardData?.length}`}
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
              <PointsTracker
                pointData={userData?.pointsOverTime}
                className="self-center"
              />
            </Card>
          </div>
          <div className="flex mt-2 gap-3 justify-center items-center grow">
            <HeaderCard
              header="Normal Challenges"
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
                    const favorited = userData?.favoritedChallenges.includes(
                      challenge.id
                    );
                    if (
                      challenge.difficulty.toLowerCase() == selectedTab ||
                      (selectedTab == "favorited" && favorited)
                    ) {
                      //@ts-ignore TODO: Fix
                      let status = userData?.challenges[challenge.id] || "unopened";
                      status = status[0].toUpperCase() + status.slice(1);
                      return (!challenge.isDaily && !wasInLastDay(parseInt(challenge.creationTimestamp))) ? (
                        <ChallengeListItem
                          index={index}
                          id={challenge.id}
                          key={challenge.id}
                          name={challenge.name}
                          solves={challenge.solves || 0}
                          status={status}
                          difficulty={challenge.difficulty}
                          points={challenge.points.toString()}
                          favorited={favorited || false}
                          favoriteCallback={favoriteChallenge}
                        />
                      ) : (
                        <></>
                      );
                    }
                  })}
                </ChallengeList>
              </div>
            </HeaderCard>
            <HeaderCard
              className="animate-flyTop ml-1 h-full"
              header="Daily Challenges"
            >
              <DailyChallengeList>
                {challenges?.map((challenge, index) => {
                  //@ts-ignore
                  let status = userData?.challenges[challenge.id] || "unopened";
                  status = status[0].toUpperCase() + status.slice(1);

                  const expires =
                    parseInt(challenge.creationTimestamp) + 24 * 60 * 60 * 1000;
                  const expiresDate = new Date(expires);

                  const daysOfWeek = [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                  ];

                  var expiresHours = expiresDate.getHours();
                  var meridian = "am";

                  if (expiresHours == 12) {
                    meridian = "pm";
                  }

                  if (expiresHours > 12) {
                    expiresHours -= 12;
                    meridian = "pm";
                  }

                  return challenge.isDaily ? (
                    <DailyChallengeListItem
                      name={challenge.name}
                      solves={challenge.solves || 0}
                      status={status}
                      index={index}
                      key={index}
                      difficulty={challenge.difficulty}
                      points={challenge.points.toString()}
                      expires={`${
                        daysOfWeek[expiresDate.getDay()]
                      } ${expiresHours}:${expiresDate
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")} ${meridian}`}
                      id={challenge.id}
                    />
                  ) : (
                    <></>
                  );
                })}
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
    {leaderboardFilterSet
      ? displayedOnLeaderboard
      : leaderboardData?.map((user, index) => (
          <LeaderboardItem
            key={index}
            name={user.name}
            points={user.points.toLocaleString()}
            place={`#${index + 1}`}
            avatar={user.image}
          />
        ))}
  </Leaderboard>
</HeaderCard>

      </div>
    </Navigation>
  );
}
