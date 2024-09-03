"use client"
import { Sidebar } from '@/components/Navigation'
import React, { useEffect } from 'react'
import {useRouter } from 'next/navigation'
import { getUserData } from '@/lib/getUserData'

export default function Play() {
  const router = useRouter();

  useEffect(()=>{
    getUserData().then((data)=>{
      const challenge = data?.lastChallenge;
      
      if(challenge){
        console.log(challenge)
        router.push(`/challenge/${challenge}`);
      }
    });
  }, [])

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
