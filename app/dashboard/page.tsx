"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ChallengeSlot from '@/components/ui/custom/dashboard/challengeSlot'
import Navigation from '@/components/ui/custom/navigation'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import LineChart from '@/components/ui/custom/dashboard/chart'
import DoughnutChart from '@/components/ui/custom/dashboard/progress'

export default function Dashboard() {
    return (
        <Navigation path={"/dashboard"}>
            <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4">
                <div className='flex flex-col w-2/3 h-full gap-1'>
                    <p className='ml-2 mt-2 mb-2'>Welcome back, Keshav!</p>
                    <div className='flex gap-1 h-[27vh]'>
                        <div className="flex gap-1 ">
                            <Card className="relative flex p-8 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <h6 className="text-xs">2000/3000 pts</h6>
                                </div>
                                <DoughnutChart value={80.9} label="80.9% Completion" />
                            </Card>
                            <Card className="relative flex p-8 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <h6 className="text-xs">80.9% Done</h6>
                                </div>
                                <DoughnutChart value={80.9} label="80.9% Completion" />
                            </Card>
                            <Card className="relative flex p-8 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <h6 className="text-xs">Point Composition</h6>
                                </div>
                                <DoughnutChart value={80.9} label="80.9% Completion" />
                            </Card>
                        </div>
                        <Card className="p-4 w-[25vw]">
                            <LineChart />
                        </Card>
                    </div>
                    <Card className="flex flex-col grow items-start w-full mt-2">
                        <div className='flex justify-center items-center mt-4 w-full'>
                            Challenges
                        </div>
                        <div className='flex gap-3'>
                            <div className='mt-2 border-t-2 border-slate-900'>
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                            </div>
                            <div className='mt-2 border-t-2 border-slate-900'>
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                            </div>
                            <div className='mt-2 border-t-2 border-slate-900'>
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                                <ChallengeSlot />
                            </div>
                        </div>
                    </Card>
                </div>
                <Card className="flex flex-col items-start w-96  pb-2 h-full">
                    <div className='flex justify-center items-center mt-4 w-full'>
                        Leaderboard
                    </div>
                    <div className='mt-2 w-full border-t-2 border-slate-900'>
                        <Table className='w-full'>
                            <TableHeader className='w-full'>
                                <TableRow className='w-full'>
                                    <TableHead className="text-center">Rank</TableHead>
                                    <TableHead className="text-center">Player</TableHead>
                                    <TableHead className="text-center">Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="text-center">#1</TableCell>
                                    <TableCell className="text-center">Keshav Shah</TableCell>
                                    <TableCell className="text-center">100k</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </Navigation>
    )
}
