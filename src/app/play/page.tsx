"use client"
import { Sidebar } from '@/components/Navigation'
import React, { useEffect } from 'react'
import { globalUserData } from '../dashboard/page'
import { redirect, useRouter } from 'next/navigation'

export default function Play() {
  useEffect(()=>{
    const challenge = globalUserData?.lastChallenge;
    if(challenge){
      redirect(`/challenge/${challenge}`)
    }
  }, [])

  return (
    <Sidebar path='/play'>
      <div 
        className='absolute top-0 left-10 right-0 bottom-0 bg-no-repeat bg-cover flex justify-center items-center'
        style={{ backgroundImage: "url('/assets/bg.svg')" }}
      >
        <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold">No unsolved challenge active!</h1>
        <h1 className="text-sm font-bold text-gray-400">Start a challenge from the dashboard and it will show up when you open this page..</h1>
        </div>
      </div>
    </Sidebar>
  )
}
