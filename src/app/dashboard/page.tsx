"use client"
import { Sidebar } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ListFilter, Table, Copy, Truck, MoreVertical, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useSession } from "next-auth/react";
import { ThreeDots } from "@/components/Threedots";


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
      <div className="flex flex-col gap-2">
      <Card className="sm:col-span-2">
          <CardHeader>
            Profile
          </CardHeader>
          <CardContent>
            <img src={session?.user?.image || ""} className="rounded-full" />
          </CardContent>
        </Card>
      <div className="flex gap-2">
        <Card className="w-96">
          <CardHeader className="pb-2">
            <CardDescription>Your points</CardDescription>
            <CardTitle className="text-4xl">100k pts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +2500 from yesterday
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={25} aria-label="25% increase" />
          </CardFooter>
        </Card>
        <Card className="w-96">
          <CardHeader className="pb-2">
            <CardDescription>Your code league ranking</CardDescription>
            <CardTitle className="text-4xl">100th</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +3 points since 8/32
            </div>
          </CardContent>
          <CardFooter>
            <Progress value={12} aria-label="12% increase" />
          </CardFooter>
        </Card>
        </div>
      </div>
    </Sidebar>
  )
}
