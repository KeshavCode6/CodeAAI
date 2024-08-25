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
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    );
  }

  return (
    <Sidebar path="/dashboard">
      <div className="flex flex-row gap-2 h-[91vh]">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 w-[80rem]">
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardDescription>Your points</CardDescription>
                <CardTitle className="text-4xl">100,000</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +2,500 from yesterday
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardDescription>Your points</CardDescription>
                <CardTitle className="text-4xl">100,000</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +2,500 from yesterday
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card className="w-full">
              <CardHeader className="pb-2">
                <CardDescription>Your Code League ranking</CardDescription>
                <CardTitle className="text-4xl">100th</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +2 places up from yesterday
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <div className="flex  gap-2 grow h-full">
            <Card className="w-full">
              <CardHeader className="self-center gap-4">
                <div>
                  <CardTitle>
                    Challenges
                  </CardTitle>
                  <CardDescription>
                    Solve fun coding challenges of varying difficulty
                  </CardDescription>
                </div>
                <Tabs defaultValue="all">
                  <TabsList defaultValue="all">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="easy">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Challenge Name</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Solves</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Play</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Reversing Strings</TableCell>
                      <TableCell>300</TableCell>
                      <TableCell>Beginner</TableCell>
                      <TableCell>32</TableCell>
                      <TableCell>Completed</TableCell>
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
            <Card>
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
                <Table className="flex flex-col items-center min-w-[30rem] grow">
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
        <Card>
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
                <TableRow>
                  <TableCell>#1</TableCell>
                  <TableCell className="flex flex-row gap-x-3">
                    <img src={session?.user?.image || ""} className="w-8 rounded-full" />
                    <span className="my-auto">Kartteekeya Punyamurthy</span>
                  </TableCell>
                  <TableCell>500,000</TableCell>
                  <TableCell>100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Sidebar>
  )
}
