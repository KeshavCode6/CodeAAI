"use client"
import { Button } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "@/components/ui/table";
import { ThreeDots } from "@/components/utils/ThreeDots";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { ChallengeFilter } from "@/lib/utils";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define a type for challenge data
export type Challenge = {
    name?: string;
    points?: number;
    difficulty?: string;
    solves?: number;
    status?: string;
    challengeId?: string;
    testCases?: any;
};

export function AdminChallengeTable() {
    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch('/api/getAdminChallengeList', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: Challenge[] = await response.json();
                setChallenges(data);
                console.log(data);
            } catch (error) {
                router.push("/")
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    async function deleteChallenge(challengeId: string) {
        try {
            const response = await fetch('/api/manageChallenge', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ challengeId }),
            });

            const data = await response.json();

            if (response.ok) {
                setChallenges((prevChallenges) =>
                    prevChallenges.filter((challenge) => challenge.challengeId !== challengeId)
                );
                console.log('Challenge deleted:', data);
            } else {
                console.error('Failed to delete challenge:', data.message);
            }
        } catch (error) {
            console.error('Error deleting challenge:', error);
        }
    }

    if (loading) {
        return (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
                <ThreeDots />
            </div>
        );
    }

    if (challenges.length <= 0) {
        return <p>None?</p>;
    }

    return (
        <div className="overflow-x-hidden"> {/* Ensure no horizontal overflow */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Challenge ID</TableHead>
                        <TableHead>Challenge Name</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>Solves</TableHead>
                        <TableHead>Test Cases</TableHead>
                        <TableHead>Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {challenges.map(challenge => (
                        <TableRow className="max-w-96" key={challenge.challengeId}>
                            <TableCell>{challenge.challengeId}</TableCell>
                            <TableCell>{challenge.name}</TableCell>
                            <TableCell>{challenge.points}</TableCell>
                            <TableCell>{challenge.difficulty}</TableCell>
                            <TableCell>{challenge.solves}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button size="icon" variant="outline">
                                            <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {challenge.testCases.map((testCase: any, index: any) => (
                                            <DropdownMenuItem key={testCase.id}>
                                                <div className="flex flex-col">
                                                    <strong>Test Case {index + 1}</strong>
                                                    <span><strong>Args:</strong> {JSON.stringify(testCase.args)}</span>
                                                    <span><strong>Output:</strong> {JSON.stringify(testCase.output)}</span>
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell>
                                <Button size="icon" variant="destructive" onClick={() => deleteChallenge(challenge.challengeId || "")}>
                                    <X />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export function ChallengeTable({ difficulty }: { difficulty: string }) {
    const [loading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const response = await fetch('/api/getChallengeList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ difficulty }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: Challenge[] = await response.json();
                setChallenges(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [difficulty]);

    if (loading) {
        return (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
                <ThreeDots />
            </div>
        );
    }

    if (challenges.length <= 0) {
        return (
            <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
                No {difficulty} Challenges have been added yet...
            </div>
        );
    }

    return (
        <div className="overflow-x-hidden"> {/* Ensure no horizontal overflow */}
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
                    {challenges.map(challenge => (
                        <TableRow key={challenge.challengeId} >
                            <TableCell>{challenge.name}</TableCell>
                            <TableCell>{challenge.points}</TableCell>
                            <TableCell>{challenge.difficulty}</TableCell>
                            <TableCell>{challenge.solves}</TableCell>
                            <TableCell>{challenge.status}</TableCell>
                            <TableCell>
                                <Link href={`/challenge/${challenge.challengeId}`}>
                                    <Button>
                                        <ChevronRight />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

interface ChallengeCardProps{
    selectedChallengeFilter:ChallengeFilter,
    setSelectedChallengeFilter:any
}

export function ChallengeCard({selectedChallengeFilter, setSelectedChallengeFilter}:ChallengeCardProps){
    return (
        <Card className="md:min-w-[40rem] 2xl:w-fit 2xl:max-w-[30vw] animate-flyRight">
        <CardHeader className="self-center gap-4">
          <div>
            <CardTitle>
              Challenges
            </CardTitle>
            <CardDescription>
              Solve fun coding challenges of varying difficulty
            </CardDescription>
          </div>
          <Tabs defaultValue="Easy" onValueChange={(value) => setSelectedChallengeFilter(value)}>
            <TabsList defaultValue="all">
              <TabsTrigger value="Easy">Beginner</TabsTrigger>
              <TabsTrigger value="Medium">Intermediate</TabsTrigger>
              <TabsTrigger value="Hard">Advanced</TabsTrigger>
              <TabsTrigger value="Daily">Daily</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="relative md:max-w-full flex justify-center items-center min-h-72">
          <ChallengeTable difficulty={selectedChallengeFilter} />
        </CardContent>
      </Card>
    );
}