import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardProps {
  children?: React.ReactNode;
}

export default function Leaderboard({ children }: LeaderboardProps) {
  return (
    <div className="w-full max-h-[700px] overflow-y-auto">
      <Table className="w-full">
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="text-center w-1/6">Place</TableHead>
            <TableHead className="text-center w-2/3">Name</TableHead>
            <TableHead className="text-center w-1/6">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-hidden">
          {children}
        </TableBody>
      </Table>
    </div>
  );
}

interface LeaderboardItemProps {
  place?: string;
  name?: string;
  points?: string;
  avatar?: string;
}

export function LeaderboardItem({ place, name, points, avatar }: LeaderboardItemProps) {
  return (
    <TableRow className="w-full">
      <TableCell className="text-center w-1/6">{place}</TableCell>
      <TableCell className="w-2/3">
        <div className="flex flex-row justify-center items-center gap-2 grow">
          <img src={avatar} className="w-7 h-7 rounded-full" alt="avatar" />
          <span>{name}</span>
        </div>
      </TableCell>
      <TableCell className="text-center w-1/6">{points}</TableCell>
    </TableRow>
  );
}
