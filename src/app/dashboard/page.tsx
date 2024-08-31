"use client"
import { Sidebar } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ListFilter, Copy, Truck, MoreVertical, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { ThreeDots } from "@/components/Threedots";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChallengeTable } from "@/components/ChallengeCard";
import { useRouter } from "next/navigation";


export default function Dashboard() {
  
  const { data: session, status } = useSession();
  const [challengeFilter, setChallengeFilter] = useState("");
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    );
  }

  if(status==="unauthenticated"){
    router.push('/?loggedIn=false');
    return;
  }

  const [leaderboardUsers, setLeaderboardUsers] = useState<Array<Object>>([]);

  const getLeaderboard = async () => {
    const response = await fetch('/api/getLeaderboard');
    const json = await response.json();

    setLeaderboardUsers(json.sort((a: any, b: any) => parseFloat(b.points) - parseFloat(a.points)));
  }

  useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <Sidebar path="/dashboard">
      <div
        className="flex flex-col md:flex-row md:justify-center gap-2 h-[91vh] bg-fit bg-center"
      >
        <div className="flex flex-col gap-2 opacity-90">
          <div className="flex flex-col pr-8 md:p-0 md:flex-row gap-2 max-w-screen">
            <UserPointsCards/>
          </div>
          <div className="flex flex-col lg:flex-row gap-2 grow">
            <Card className="md:w-full md:min-w-[40rem] max-w-[90vw]">
              <CardHeader className="self-center gap-4">
                <div>
                  <CardTitle>
                    Challenges
                  </CardTitle>
                  <CardDescription>
                    Solve fun coding challenges of varying difficulty
                  </CardDescription>
                </div>
                <Tabs defaultValue="Easy" onValueChange={(value) => setChallengeFilter(value)}>
                  <TabsList defaultValue="all">
                    <TabsTrigger value="Easy">Beginner</TabsTrigger>
                    <TabsTrigger value="Medium">Intermediate</TabsTrigger>
                    <TabsTrigger value="Hard">Advanced</TabsTrigger>
                    <TabsTrigger value="Daily">Daily</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent className="relative md:min-w-[37rem]">
                <ChallengeTable difficulty={challengeFilter} />
              </CardContent>
            </Card>
            <Card className="md:w-full  md:min-w-[30rem] max-w-[90vw]">
              <CardHeader className="gap-4">
                <div>
                  <CardTitle>
                    Code League Matches
                  </CardTitle>
                  <CardDescription>
                    See what code league matches you have coming up
                  </CardDescription>
                </div>
                <Tabs className="mt-5" defaultValue="active">
                  <TabsList>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Table >
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Your Points</TableHead>
                      <TableHead>Players</TableHead>
                      <TableHead>Enter</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fall Hacks 2024</TableCell>
                      <TableCell>300</TableCell>
                      <TableCell>63</TableCell>
                      <TableCell>
                        <Link href="/">
                          <Button>
                            <ChevronRight />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="w-full lg:w-1/4 mt-2 lg:mt-0 ">
          <Card className="min-h-[90vh]">
            <CardHeader>
              <div>
                <CardTitle>
                  Leaderboard
                </CardTitle>
                <CardDescription>
                  See how you rank among the best of the best
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Completion</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardUsers.map((user, index) => (
                    <TableRow>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell className="flex flex-row gap-x-3">
                        <img src={user.image} className="w-8 rounded-full" />
                        <span className="my-auto">{user.name}</span>
                      </TableCell>
                      <TableCell>{user.points.toLocaleString()}</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                  ))}
                  
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Sidebar>
  )
}

type UserStats = {
  points: number;
  solves: number;
  codeLeagueRank: number;
  lastChallenge:string;
};

export var globalUserData : UserStats | null = null;

function UserPointsCards() {
  const [userData, setUserData] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch('/api/getUser');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        globalUserData = data;
        setUserData(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const renderCardContent = (data: UserStats | null, placeholder: boolean) => (
    <>
      <CardHeader className="pb-2">
        <CardDescription>Your points</CardDescription>
        <CardTitle className="text-4xl">{placeholder ? '...' : data?.points}pts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">
          {placeholder ? '...' : `+${1000} more to go`}
        </div>
      </CardContent>
      <CardFooter>
        <Progress  value={placeholder ? 0 : Math.min((data?.points || 0) / 3000, 1)}/>
      </CardFooter>
    </>
  );

  return (
    <>
      <Card className="md:w-full max-w-[90vw]">
        {loading || !userData ? renderCardContent(null, true) : renderCardContent(userData, false)}
      </Card>
      <Card className="md:w-full max-w-[90vw]">
        {loading || !userData ? renderCardContent(null, true) : renderCardContent(userData, false)}
      </Card>
      <Card className="md:w-full max-w-[90vw]">
        <CardHeader className="pb-2">
          <CardDescription>{loading || !userData ? '...' : 'Your Code League ranking'}</CardDescription>
          <CardTitle className="text-4xl">{loading || !userData ? '...' : userData.codeLeagueRank}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {loading || !userData ? '...' : `You are 1/100`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={loading || !userData ? 0 : 100} aria-label="Rank progress" />
        </CardFooter>
      </Card>
    </>
  );
}

