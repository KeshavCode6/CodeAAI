import { ChevronRight, Star } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChallengeListProps {
  children?: React.ReactNode;
}

export function ChallengeList({ children }: ChallengeListProps) {
  return (
    <div className="w-full max-h-[450px] overflow-y-auto">
      <Table className="w-full">
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Difficulty</TableHead>
            <TableHead className="text-center">Solves</TableHead>
            <TableHead className="text-center">Points</TableHead>
            <TableHead className="text-center">Play</TableHead>
            <TableHead className="text-center">Favorited</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="overflow-hidden">{children}</TableBody>
      </Table>
    </div>
  );
}

interface ChallengeListItemProps {
  name: string;
  solves: number;
  status: string;
  difficulty: string;
  points: string;
  id: string;
  index: number;
  favorited: boolean;
  favoriteCallback: (id: string) => void;
}

export function ChallengeListItem({
  index,
  name,
  status,
  solves,
  difficulty,
  points,
  favorited,
  favoriteCallback,
  id,
}: ChallengeListItemProps) {
  const lowerCaseDifficulty = difficulty?.toLowerCase();
  //@ts-ignore
  const bgColor = customColors[`${lowerCaseDifficulty}Bg`];
  //@ts-ignore
  const fgColor = customColors[`${lowerCaseDifficulty}Fg`];

  return (
    <TableRow
      className="w-full animate-fade opacity-0 h-fit"
      style={{
        animationFillMode: "forwards",
        animationDelay: `${0.25 * index}s`,
      }}
    >
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center font-normal">{status}</TableCell>
      <TableCell className="text-center">
        <span
          className="p-2 rounded-lg"
          style={{ backgroundColor: bgColor, color: fgColor }}
        >
          {difficulty}
        </span>
      </TableCell>
      <TableCell className="text-center font-normal">{solves}</TableCell>
      <TableCell className="text-center">{points.toLocaleString()}</TableCell>

      <TableCell className="flex">
        <Button
          variant={"outline"}
          className="m-auto"
          size={"icon"}
          onClick={() => {
            location.href = `/challenge/${id}`;
          }}
        >
          <ChevronRight size={15} />
        </Button>
      </TableCell>

      <TableCell>
        <Button
          onClick={() => {
            favoriteCallback(id);
          }}
          variant="ghost"
          className="ml-[15%] hover:cursor-pointer"
        >
          <Star fill={favorited ? "#ffffff" : ""} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export function DailyChallengeList({ children }: ChallengeListProps) {
  return (
    <Table className="w-full">
      <ScrollArea className="w-full h-[24rem]">
        <TableHeader className="w-full">
          <TableRow className="w-full">
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Difficulty</TableHead>
            <TableHead className="text-center">Solves</TableHead>
            <TableHead className="text-center">Points</TableHead>
            <TableHead className="text-center">Expires</TableHead>
            <TableHead className="text-center">Play</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">{children}</TableBody>
      </ScrollArea>
    </Table>
  );
}

interface DailyChallengeListItemProps {
  name?: string;
  status?: string;
  solves?: number;
  difficulty?: string;
  points?: string;
  expires?: string;
  id?: string;
  index: number;
}

var customColors = {
  easyBg: "#c9ffe2",
  easyFg: "#285a3f",
  mediumBg: "#f7e877",
  mediumFg: "#73691d",
  hardBg: "#e37474",
  hardFg: "#611010",
};

export function DailyChallengeListItem({
  name,
  status,
  solves,
  difficulty,
  points,
  expires,
  id,
  index,
}: DailyChallengeListItemProps) {
  const lowerCaseDifficulty = difficulty?.toLowerCase();

  // TODO: FIX TSX ERROR, FOR NOW JUST IGNORING
  //@ts-ignore
  const bgColor = customColors[`${lowerCaseDifficulty}Bg`];
  //@ts-ignore
  const fgColor = customColors[`${lowerCaseDifficulty}Fg`];

  return (
    <TableRow
      className="w-full animate-fade opacity-0 h-fit"
      style={{
        animationFillMode: "forwards",
        animationDelay: `${0.25 * index}s`,
      }}
    >
      <TableCell className="text-center">{name}</TableCell>
      <TableCell className="text-center">{status}</TableCell>
      <TableCell className="text-center">
        <span
          className="p-2 rounded-lg"
          style={{ backgroundColor: bgColor, color: fgColor }}
        >
          {difficulty}
        </span>
      </TableCell>
      <TableCell className="text-center">{solves}</TableCell>
      <TableCell className="text-center">{points}</TableCell>
      <TableCell className="text-center">{expires}</TableCell>
      <TableCell className="flex">
        <Button
          variant={"outline"}
          className="m-auto"
          size={"icon"}
          onClick={() => {
            location.href = `/challenge/${id}`;
          }}
        >
          <ChevronRight size={15} />
        </Button>
      </TableCell>
    </TableRow>
  );
}
