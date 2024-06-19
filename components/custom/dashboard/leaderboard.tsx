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

interface LeaderboardProps {
  children?:React.ReactNode;
}
export default function Leaderboard({children}:LeaderboardProps) {
  return (
    <Table className="w-full">
      <TableHeader className="w-full">
        <TableRow className="w-full">
          <TableHead className="text-center">Place</TableHead>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="justify-center w-full">
        {children}
      </TableBody>
    </Table>
  );
}

interface LeaderboardItemProps{
  place?:string,
  name?:string,
  points?:string
}

export function LeaderboardItem({place, name, points}:LeaderboardItemProps) {
  return (
    <TableRow className="w-full">
      <TableCell className="text-center">{place}</TableCell>
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">{points}</TableCell>
    </TableRow>
  );
}
