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
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
    return (
        <Navigation path={"/dashboard"}>
            <div className="h-[92vh] w-screen flex gap-2 justify-center py-8 px-4">
                <div className='flex flex-col h-full gap-1'>
                    <div className='flex gap-1 h-[27vh]'>
                        <div className="flex gap-1 ">
                            <Card className="relative flex p-12 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-xs">2000/3000 pts</span>
                                </div>
                                <DoughnutChart value={80.9} label="80.9% Completion" />
                            </Card>
                            <Card className="relative flex p-12 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-xs">Point < Composition</span>
                                </div>
                                <DoughnutChart value={80.9} label="80.9% Completion" />
                            </Card>
                            <Card className="relative flex p-12 justify-center items-center h-full">
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-xs">Top 10%</span>
                                </div>
                                <DoughnutChart value={10} label="80.9% Completion" />
                            </Card>
                        </div>
                        <Card className="p-4 w-[25vw]">
                            <LineChart />
                        </Card>
                    </div>
                    <Card className="flex flex-col grow items-start w-1/2 mt-2 p-0">
                        <div className='p-0 mt-0 rounded-tl-2xl rounded-tr-2xl h-12 flex justify-center items-center bg-black mt-4 w-full bg-slate-900'>
                            Challenges
                        </div>
                        <div className='relative w-full border-t-2 border-slate-900'>
                            <Table className='w-full'>
                                <TableHeader className='w-full'>
                                    <TableRow className='w-full'>
                                        <TableHead className="text-center">Name</TableHead>
                                        <TableHead className="text-center">Status</TableHead>
                                        <TableHead className="text-center">Difficulty</TableHead>
                                        <TableHead className="text-center">Points</TableHead>
                                        <TableHead className="text-center">Play</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='w-full'>
                                    <TableRow className='w-full'>
                                        <TableCell className="text-center">Merge Sort</TableCell>
                                        <TableCell className="text-center">In Progress</TableCell>
                                        <TableCell className="text-center">Hard</TableCell>
                                        <TableCell className="text-center">100k</TableCell>
                                        <TableCell className="flex">
                                            <Button variant={"outline"} size={"icon"} className='pl-5'>
                                                <ChevronRight size={15}/>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Tabs defaultValue="description" className="absolute bottom-0 right-0 w-52 h-full">
                                <TabsList className="px-4 w-full">
                                    {/* TabsList Content */}
                                </TabsList>
                                <TabsContent value="description">Description Content</TabsContent>
                            </Tabs>
                        </div>
                    </Card>
                </div>
                <Card className="flex flex-col items-start w-96  pb-2 h-full">
                    <div className='p-0 mt-0 rounded-tl-2xl rounded-tr-2xl h-12 flex justify-center items-center bg-black mt-4 w-full bg-slate-900'>
                        Leaderboard
                    </div>
                    <div className='w-full border-t-2 border-slate-900'>
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
