"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getMyUserData, UserStats } from "@/lib/getUserData";
import { ThreeDots } from "../utils/ThreeDots";

interface LeaderboardUser {
    image: string; 
    name: string; 
    solves: number; 
    points: number
}

export default function Leaderboard({userData}:any) {
    const { data: session, status } = useSession();
    
    const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]); // all users on the leaderboard
    const [leaderboardFilter, setLeaderboardFilter] = useState<string>("all"); // active leaderboard filter

    // getting leaderboard users everytime the filter is changed
    useEffect(() => {
        const getLeaderboard = async () => {
            const response = await fetch('/api/getLeaderboard');
            const json = await response.json();
            setLeaderboardUsers(json.sort((a: any, b: any) => parseFloat(b.points) - parseFloat(a.points)));
        };

        getLeaderboard();
    }, [leaderboardFilter]);



    // if authentication status is loading 
    if (status === "loading") {
        return <ThreeDots />
    }

    return (
        <Card className="w-full h-full max-w-lg flex-grow">
            <CardHeader className="w-full flex flex-row">
                <div>
                    <CardTitle className="w-fit">Leaderboard</CardTitle>
                    <CardDescription>Analyze the competition</CardDescription>
                </div>
                <div className="self-end ml-auto relative">
                    <Select onValueChange={(setLeaderboardFilter)}>
                        <SelectTrigger className="w-[180px] float-right">
                            <SelectValue placeholder="Select a filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Filter</SelectLabel>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="month">Last Month</SelectItem>
                                <SelectItem value="year">Last Year</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Points</TableHead>
                            <TableHead>Solved</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaderboardUsers.map((user, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.points} / {userData?.totalPoints}</TableCell>
                                <TableCell>{user.solves} / {userData?.totalChallenges}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}