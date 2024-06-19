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
} from "@/components/ui/table";

interface ChallengeListItemProps {
  name?: string;
  status?: string;
  difficulty?: string;
  points?: string;
}

export function ChallengeListItem({
  name,
  status,
  difficulty,
  points,
}: ChallengeListItemProps) {
  return (
    <TableRow className="w-full">
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">{status}</TableCell>
      <TableCell className="text-center">{difficulty}</TableCell>
      <TableCell className="text-center">{points}</TableCell>
      <TableCell className="flex">
        <Button variant={"outline"} className="m-auto" size={"icon"}>
          <ChevronRight size={15} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

interface ChallengeListProps {
  children?: React.ReactNode;
}

export function ChallengeList({ children }: ChallengeListProps) {
  return (
    <Table className="w-full">
      <TableHeader className="w-full">
        <TableRow className="w-full">
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Difficulty</TableHead>
          <TableHead className="text-center">Points</TableHead>
          <TableHead className="text-center">Play</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="w-full">
        {children}
      </TableBody>
    </Table>
  );
}
