import { UserStats } from "@/lib/getUserData";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
} from "recharts";

export const description = "A stacked bar chart";
const chartData = [
  { browser: "Chrome", visitors: 275, other: 20 },
  { browser: "Safari", visitors: 200, other: 30 },
  { browser: "Firefox", visitors: 187, other: 40 },
  { browser: "Edge", visitors: 173, other: 60 },
  { browser: "Other", visitors: 90, other: 10 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function UserPointsCards({ userData }: { userData: UserStats }) {
  if (userData?.points || userData?.totalChallenges) {
    if (userData?.points <= 0 || userData?.totalChallenges <= 0) {
      userData.points = 1;
      userData.totalChallenges = 1;
    }
  }
  const pointsProgress = userData ? Math.min(userData.points / userData.totalPoints, 1) * 100 : 0;
  const solvesProgress = userData ? Math.min(userData.solves / userData.totalChallenges, 1) * 100 : 0;

  return (
    <div className="flex 2xl:w-[55vw] flex-col px-8 2xl:p-0 md:flex-row gap-2 max-w-screen animate-flyBottom">
      <Card className="flex-grow">
        <CardHeader className="pb-2">
          <CardDescription>Your points</CardDescription>
          <CardTitle className="text-4xl">{`${userData?.points || 0} pts`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {`${(userData?.totalPoints || 0) - (userData?.points || 0)} more to go`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={pointsProgress} aria-label="Points progress" />
        </CardFooter>
      </Card>

      <Card className="flex-grow" >
        <CardHeader className="pb-2">
          <CardDescription>Your solves</CardDescription>
          <CardTitle className="text-4xl">{`${userData?.solves}`}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            {`${userData?.solves || 0} challenges solved out of ${userData?.totalChallenges || 0}`}
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={solvesProgress} aria-label="Solves progress" />
        </CardFooter>
      </Card>
      
      <Card className="flex-grow" >
        <CardContent className="flex-1 py-2">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-h-[175px]"
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="browser" />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="visitors" stackId="a" fill="var(--color-bar)" />
              <Bar dataKey="other" stackId="a" fill="var(--color-other)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
