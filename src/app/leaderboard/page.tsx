"use client"
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Navigation";
import { useSession } from "next-auth/react";
import { ThreeDots } from "@/components/Threedots";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { getLastSevenDays } from "@/lib/utils";
import { getUserData, UserStats } from "@/lib/getUserData";
import { Cell, Label, Pie, PieChart, Tooltip } from "recharts"

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#6A5ACD', '#FF1493', '#FF4500'];

export default function Leaderboard() {
  const { data: session, status } = useSession();
  const [chartData, setChartData] = useState<Array<{ day: string; player1: number; player2: number }>>([]);
  const [leaderboardUsers, setLeaderboardUsers] = useState<Array<{ image: string; name: string; solves: number; points: number }>>([]);
  const [leaderboardFilter, setLeaderboardFilter] = useState<string>("all");
  const [userData, setUserData] = useState<UserStats | null>(null);
  const [pieChartData, setPieChartData] = useState<any>([]);


  const getLeaderboard = async () => {
    const response = await fetch('/api/getLeaderboard');
    const json = await response.json();
    setLeaderboardUsers(json.sort((a: any, b: any) => parseFloat(b.points) - parseFloat(a.points)));
  };

  useEffect(() => {
    const lastSevenDays = getLastSevenDays();
    setChartData(lastSevenDays.map(day => ({
      day,
      player1: Math.random() * 200,
      player2: Math.random() * 200,
    })));
    getLeaderboard();
  }, []);

  useEffect(() => {
    getUserData().then((data) => {
      setUserData(data);
      console.log(data)
      if(!data){return;}
      setPieChartData([
        [
          { name: 'Easy Challenges Solved', value: data.easyChallenges },
          { name: 'Easy Challenges Not Solved', value: data.totalEasyChallenges-data.easyChallenges },
        ],
        [
          { name: 'Easy Challenges Solved', value: data.mediumChallenges },
          { name: 'Easy Challenges Not Solved', value: data.totalMediumChallenges-data.mediumChallenges },
        ],
        [
          { name: 'Easy Challenges Solved', value: data.easyChallenges },
          { name: 'Easy Challenges Not Solved', value: data.totalHardChallenges-data.hardChallenges },
        ],
        [
          { name: 'Easy Challenges Solved', value: data.easyChallenges },
          { name: 'Easy Challenges Not Solved', value: data.totalDailyChallenges-data.dailyChallenges },
        ],
      ]);    
    });
  }, []);

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    );
  }

  const diff = ["Easy", "Medium", "Hard", "Daily"]
  return (
    <Sidebar path="/leaderboard">
      <div className="flex h-[90vh] w-full justify-center items-center">

      <div className="flex justify-center flex-col m-4 mt-0 2xl:flex-row 2xl:mt-4 2xl:mx-32 gap-2">
        <div className="grid grid-cols-2 gap-1">
          {pieChartData.map((data:any, index:number) => (
            <Card key={index} className="w-full">
              <CardContent className="flex justify-center items-center">
                <PieChart width={350} height={250}>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                  >
                    {pieChartData.map((entry:any, index:number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </CardContent>
              <div className="flex justify-center flex-col w-full items-center p-4">
                <p>% {diff[index]} Challenges</p>
              </div>
            </Card>
          ))}
        </div>

        <Card className="w-full max-w-lg flex-grow">
          <CardHeader className="w-full flex flex-row">
            <div>
              <CardTitle className="w-fit">Leaderboard</CardTitle>
              <CardDescription>Analyze the competition</CardDescription>
            </div>
            <div className="self-end ml-auto relative">
              <Select onValueChange={setLeaderboardFilter}>
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
                {leaderboardUsers.map((user, index:number) => (
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
      </div>
      
      </div>
    </Sidebar>
  );
}
