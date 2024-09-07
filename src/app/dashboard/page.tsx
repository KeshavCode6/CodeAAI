"use client"
import { Sidebar } from "@/components/utils/Navigation";
import { useSession } from "next-auth/react";
import { LoadingPage } from "@/components/utils/ThreeDots";
import {useEffect, useState } from "react";
import { ChallengeCard } from "@/components/dashboard/ChallengeCard";
import { useRouter } from "next/navigation";
import {ChallengeFilter } from "@/lib/utils";
import { UserPointsCards } from "@/components/dashboard/UserPoints";
import Leaderboard from "@/components/dashboard/Leaderboard";
import { getMyUserData, UserStats } from "@/lib/getUserData";


export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession(); // authentication hook

  const [myUser, setMyUser] = useState<UserStats | null>(null);
  const [selectedChallengeFilter, setSelectedChallengeFilter] = useState<ChallengeFilter>(ChallengeFilter.BEGINNER); // used to filter challenge by difficulty 
  
  useEffect(() => {
      (async () => {
        const myUserData = await getMyUserData();
        setMyUser(myUserData);
      })();
  }, [])

  // if the user auth status is loading
  if (status === "loading" || !myUser) {
    return <LoadingPage/>
  }

  // if the user is not logged in, redirect them to the home page
  if (status === "unauthenticated") {
    router.push('/?loggedIn=false');
    return;
  }

  return (
    <Sidebar path="/dashboard">
      <div className="flex flex-col md:px-4 2xl:flex-row gap-2 justify-center 2xl:h-[90vh] 2xl:overflow-y-hidden">
        <div className="flex flex-col gap-2">
          <UserPointsCards userData={myUser} />
          <div className="flex flex-col px-8 2xl:p-0 2xl:flex-row gap-2 grow">
            <ChallengeCard selectedChallengeFilter={selectedChallengeFilter} setSelectedChallengeFilter={setSelectedChallengeFilter}/>
          </div>
        </div>
        <div className="w-full bg-[#101424] 2xl:max-w-lg animate-flyTop">
          <Leaderboard/>
        </div>
      </div>
    </Sidebar>
  )
}