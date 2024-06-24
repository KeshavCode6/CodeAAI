import React from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
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
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface LeaderboardProps {
  children?:React.ReactNode;
}
export default function Leaderboard({children}:LeaderboardProps) {
  return (
    <ScrollArea className="h-full w-full rounded-md border">
      <Table className="w-full">
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="text-center">Place</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="justify-center h-400px] w-full">
            {children}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}

interface LeaderboardItemProps{
  place?:string,
  name?:string,
  points?:string, 
  avatar?: string
}

export function LeaderboardItem({place, name, points, avatar}:LeaderboardItemProps) {
  return (
    <TableRow className="w-full">
      <TableCell className="text-center">{place}</TableCell>
      <TableCell>
        <div className="flex flex-row gap-2 ml-7">
          <img src={avatar} className="w-7 h-7 rounded-full"/>
          <span className="mt-1">{name}</span>
        </div>
      </TableCell>
      <TableCell className="text-center">{points}</TableCell>
    </TableRow>
  );
}
