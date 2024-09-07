"use client"
import { Sidebar } from '@/components/utils/Navigation'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { LoadingPage } from '@/components/utils/ThreeDots'
import { getMyUserData } from '@/lib/getUserData'

export default function Play() {
  const router = useRouter();
  const { data: session, status } = useSession(); // authentication hook
  
  // fetching active user's user data
  useEffect(() => {
    (async () => {
      const fetchedUserData = await getMyUserData();

      // redirecting the user to their most recent unsolved challenge
      if (fetchedUserData) {
        const challenge = fetchedUserData.lastChallenge;

        // if they have an active challenge, redirect to it
        if (challenge) {
          router.push(`/challenge/${challenge}`);
        }
      }
    })();
  }, [])

  // if the user auth status is loading
  if (status === "loading") {
    return <LoadingPage />
  }

  // if the user is not logged in, redirect them to the home page
  if (status === "unauthenticated") {
    router.push('/?loggedIn=false');
    return;
  }

  return (
    <Sidebar path='/play'>
      <div
        className='absolute top-0 left-0 md:left-10 right-0 bottom-0 bg-no-repeat bg-cover flex justify-center items-center '
        style={{ backgroundImage: "url('/assets/bg.svg')" }}
      >
        <div className="flex flex-col items-center animate-fade">
          <h1 className="text-2xl font-bold">No unsolved challenge active!</h1>
          <h1 className="text-sm font-bold text-gray-400 mx-4 text-center">Start a challenge from the dashboard and it will show up when you open this page..</h1>
        </div>
      </div>
    </Sidebar>
  )
}
