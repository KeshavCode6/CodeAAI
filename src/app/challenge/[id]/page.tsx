"use client";
import { useEffect, useState } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCcw, PlayIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LoadingPage } from "@/components/utils/ThreeDots";
import { Sidebar } from "@/components/utils/Navigation";
import { ChallengeTestCaseProps, ChallengeVisibleTestCaseProps, codeEditorTheme } from "@/lib/utils";
import { ChallengeTestCase } from "@/components/challenge/ChallengeTestCase";


// Challenge page
export default function Challenge({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const [userCode, setUserCode] = useState<string>(""); // all the code in the editor
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false); // if the user has not submitted their code 
  const [challengeData, setChallengeData] = useState<any>(undefined); // data fetched about the challenge
  const [formattedDescription, setFormattedDescription] = useState<string>(""); // challenge description
  const [challengeArgs, setChallengeArgs] = useState<string>(""); // each input for the challenge
  const [visibleTestCases, setVisibleTestCases] = useState<ChallengeVisibleTestCaseProps[]>([]);
  const [totalTestCases, setTotalTestCases] = useState<number>(0);

  const defaultCodeTemplate = `
  '''
  Challenge Description: 
  ${formattedDescription}
  '''
  
  import sys
  ${challengeArgs}
  `;

  // Handle code editor value change
  const handleCodeChange = (value: string | undefined) => {
    if (value) {
      setUserCode(value);
      setHasUnsavedChanges(true);
    }
  };

  // Fetch challenge data from the API
  const fetchChallengeData = async () => {
    try {
      const response = await fetch("/api/getChallengeData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId: params.id }),
        credentials: "include",
      });

      const data = await response.json();
      var challengeData = data.challengeData;
      setChallengeData(challengeData);

      formatChallengeData(challengeData);
    } catch (error) {
      console.error("Error fetching challenge data:", error);
    }
  };

  // Format challenge description and arguments
  const formatChallengeData = (data: any) => {
    const formattedDesc = formatText(data.description, 10);
    const args = formatArguments(data.arguments);

    setFormattedDescription(formattedDesc);
    setChallengeArgs(args);
  };

  // Helper to format text into multiple lines
  const formatText = (text: string, wordsPerLine: number) => {
    const words = text.split(/\s+/);
    return words.reduce((formatted, word, index) => {
      return formatted + word + (index % wordsPerLine === wordsPerLine - 1 ? '\n  ' : ' ');
    }, "");
  };

  // Helper to format challenge arguments
  const formatArguments = (args: any) => {
    return Object.keys(args).reduce((result, arg, index) => {
      const typeFunc = mapTypeToFunction(args[arg]);
      return result + `${arg} = ${typeFunc}(sys.argv[${index + 1}])\n`;
    }, "\n# <- Challenge Arguments\n");
  };

  const mapTypeToFunction = (type: string) => {
    const typeMap: { [key: string]: string } = { Int: "int", Str: "str", Float: "float", Bool: "bool" };
    return typeMap[type] || "str";
  };

  // Handle code submission
  const attemptChallenge = async () => {
    toast({ variant: "default", title: "Testing Your Code...", description: "Please wait..." });

    try {
      const response = await fetch("/api/attemptChallenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: userCode, challengeId: params.id }),
        credentials: "include",
      });
      const data = await response.json();

      const { status, result, failed, total, visibleTestCases } = data;

      console.log(data.status=="error")
      if(status=="error"){
        toast({ variant: "default", title: "Your code could not be executed!", description: data.message });
        return;
      }

      if (visibleTestCases) setVisibleTestCases(visibleTestCases);
      setTotalTestCases(total);

      toast({ variant: result.toLowerCase() === "passed" ? "success" : "default", title: result, description: getResultDescription(result) });

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("Error submitting code:", error);
      toast({ variant: "destructive", title: "Something went wrong!", description: "An error occurred during code execution." });
    }
  };

  const getResultDescription = (result: string) => {
    return result.toLowerCase() === "passed" ? "Your code passed all test cases!" : "Keep trying!";
  };

  // Load challenge data on component mount
  useEffect(() => {
    if (status !== "loading") fetchChallengeData();
    loader.init().then(codeEditorTheme);
  }, [status]);


  // if the user auth status is loading
  if (status === "loading" || !challengeData) {
    return <LoadingPage />
  }

  // if the user is not logged in, redirect them to the home page
  if (status === "unauthenticated") {
    router.push('/?loggedIn=false');
    return;
  }

  return (
    <Sidebar path="/play">
      <div className="overflow-x-hidden h-[90vh]">
        <div className="flex flex-col lg:flex-row gap-2 w-screen items-center justify-center">
          {/* Code Editor */}
          <Card className="p-2 w-11/12 h-[30vh] 2xl:w-[60vw] md:h-[87vh] animate-flyBottom">
            <Editor
              height="100%"
              width="100%"
              theme="moon"
              value={userCode}
              onChange={handleCodeChange}
              defaultLanguage="python"
              defaultValue={defaultCodeTemplate}
            />
          </Card>

          {/* Challenge Info */}
          <Card className="w-11/12 h-fit mb-12 2xl:mb-0 2xl:w-[23vw] p-4 md:h-[87vh] animate-flyTop relative">
            <div className="relative flex flex-col items-center gap-3 p-6">
              <Button className="absolute left-3 top-3 w-6 h-6" variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft size={15} />
              </Button>
              <h1 className="text-xl font-extrabold text-white">{challengeData.name}</h1>
              <div className="mt-[-15px] font-light text-gray-400 space-y-1 w-full">
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Author:</span> {challengeData.authorName}</p>
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Difficulty:</span> {challengeData.difficulty}</p>
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Points:</span> {challengeData.points}</p>
                <Separator className="my-2" />
              </div>
            </div>

            {/* Test Cases */}
            <div className="mt-4 flex flex-col h-fit items-center">
              <div className="w-5/6">
                {visibleTestCases.map((testCase, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <ChallengeTestCase
                      position={index + 1}
                      inputs={Object.values(testCase.input || {}).join(', ') || "None"}
                      expectedOutput={testCase.expected}
                      receivedOutput={testCase.received}
                      result={testCase.result ? "Passed" : "Failed"}
                    />
                  </Accordion>
                ))}
              </div>
            </div>
            {/* Submit and Reset Buttons */}
            <div className="absolute flex gap-2 bottom-16 left-0 right-0 justify-center animate-fadeIn">
              <Button onClick={() => setUserCode(defaultCodeTemplate)} variant="secondary" size="sm" disabled={!hasUnsavedChanges}>
                <RefreshCcw size={15} /> Reset
              </Button>
              <Button onClick={attemptChallenge} variant="default" size="sm">
                <PlayIcon size={15} /> Submit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Sidebar>
  );
}