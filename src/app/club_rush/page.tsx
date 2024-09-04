"use client"
import { Navbar, Sidebar } from '@/components/Navigation'
import React, { useEffect, useState } from 'react'
import {useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';

export default function Play() {
  const router = useRouter();
  const [challenges, setChallenges] = useState([])

  useEffect(()=>{
    const getChallenges = async()=>{
      const response = await fetch('/api/getChallengeList');
      const json = await response.json();
      setChallenges(json.ids)
    };
    getChallenges();
  }, [])

  const getRandomChallenge = () => {
    return challenges[Math.floor(Math.random() * challenges.length)];
  };

  return (
    <Navbar>
      <div 
        className='absolute top-0 left-0 md:left-10 right-0 bottom-0 bg-no-repeat bg-cover flex justify-center items-center '
        style={{ backgroundImage: "url('/assets/bg.svg')" }}
      >
        <div className="flex flex-col items-center animate-fade">
        <h1 className="text-2xl font-bold">Presenting: Code AAI!</h1>
        <h1 className="text-sm max-w-lg font-bold text-gray-400 mx-4 text-center mb-4">The Coding Club's very own coding challenge site! 
          This site is still underdevelopment and we have big plans for the future, inlcuding a county wide competition that will begin at this year!</h1>
          <img className="w-[45vw] aspect-video mb-4" src={"/assets/demo.gif"}/>
          <div className='flex gap-1 animate-flyTop'>
          <Button onClick={()=>{router.push("/")}}     className='text-white px-4' size={"lg"}>Try it out for yourself for candy!</Button>
          <Button  onClick={()=>{router.push(`/challenge/${getRandomChallenge()}`)}} className='text-white px-4' size={"lg"}> Check out the rest of the site!</Button>
          </div>
        </div>
      </div>
    </Navbar>
  )
}
