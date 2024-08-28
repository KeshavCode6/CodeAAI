"use client"
import { Sidebar } from "@/components/Navigation";
import { useSession } from "next-auth/react";
import { ThreeDots } from "@/components/Threedots";

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getLastSevenDays } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const chartConfig = {
    player1: {
      label: "Player 1",
      color: "hsl(var(--chart-1))",
    },
    player2: {
      label: "Player 2",
      color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function Leaderboard() {

  const { data: session, status } = useSession();

  const [chartData, setChartData] = useState<Array<Object>>([]);

  useEffect(() => {

    const lastSevenDays = getLastSevenDays();

    setChartData([]);

    for (const day of lastSevenDays) {
        setChartData((o : any) => [...o, {day, player1: Math.random() * 200, player2: Math.random() * 200}])
    }

    console.log(lastSevenDays);

  }, [])

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    );
  }

  return (
    <Sidebar path="/leaderboard">
        <div className="flex flex-wrap justify-center mt-2 h-[90vh] gap-x-2 p-16">
        <Card className="w-[50rem]">
            <CardHeader>
                <CardTitle>Points Over Time</CardTitle>
                <CardDescription>
                Showing player points over the past week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <defs>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="5%"
                        stopColor="#ff0000"
                        stopOpacity={0.8}
                        />
                        <stop
                        offset="95%"
                        stopColor=""
                        stopOpacity={0.1}
                        />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                        <stop
                        offset="5%"
                        stopColor="#8adeff"
                        stopOpacity={0.8}
                        />
                        <stop
                        offset="95%"
                        stopColor="#8adeff"
                        stopOpacity={0.1}
                        />
                    </linearGradient>
                    </defs>
                    <Area
                    dataKey="player1"
                    type="natural"
                    fill="url(#fillDesktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-mobile)"
                    stackId="a"
                    />
                    <Area
                    dataKey="player2"
                    type="natural"
                    fill="url(#fillMobile)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                    />
                </AreaChart>
                </ChartContainer>
            </CardContent>
            </Card>
            <Card className="w-[50rem]">
                <CardHeader className="w-full flex flex-row">
                    <CardTitle className="w-fit">
                        Leaderboard
                    </CardTitle>
                    <div className="w-full justify-end relative">
                    <Select>
                        <SelectTrigger className="w-[180px] float-right">
                            <SelectValue placeholder="Select a filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Filters</SelectLabel>
                            <SelectItem value="apple">Top 5</SelectItem>
                            <SelectItem value="banana">Top 20</SelectItem>
                            <SelectItem value="blueberry">Top 100</SelectItem>
                            <SelectItem value="grapes">Around Me</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent className="h-full">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Solved Challenges</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Completion</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(i => <TableRow>
                        <TableCell>#1</TableCell>
                        <TableCell className="flex flex-row gap-x-3 justify-center">
                        <img src={session?.user?.image || ""} className="w-8 rounded-full" />
                        <span className="my-auto">Kartteekeya Punyamurthy</span>
                        </TableCell>
                        <TableCell>999</TableCell>
                        <TableCell>500,000</TableCell>
                        <TableCell>100%</TableCell>
                    </TableRow>)}
                    </TableBody>
                </Table>
                </CardContent>
                </Card>
          </div>
    </Sidebar>
  )
}

// Define a type for challenge data
