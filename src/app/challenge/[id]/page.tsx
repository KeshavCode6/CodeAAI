"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import { Editor, loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { RefreshCcw, PlayIcon, ArrowLeft } from "lucide-react";
import { IChallenge } from "@/lib/database/schemas/Challenge";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

// Define VisibleTestCase interface
interface VisibleTestCase {
  input?: Record<string, any>;
  expected: string;
  received: string;
  result: boolean;
}

// challenge page, params.id is the id of the challenge
export default function Challenge({ params }: { params: { id: string } }) {
  const [code, setCode] = useState<string>(""); // code from the editor
  const [isDirty, setIsDirty] = useState<boolean>(false); // track unsaved changes
  const { session, status } = useProtectedRoute(); // auth data
  const [challengeData, setChallengeData] = useState<IChallenge | undefined>(undefined); // loaded challenge data
  const [challengeDescription, setChallengeDescription] = useState<string>(""); // loaded challenge data
  const [challengeArguments, setChallengeArguments] = useState<string>(""); // loaded challenge data
  const [author, setAuthor] = useState<string>(""); // loaded challenge data
  const [visibleTestCases, setVisibleTestCases] = useState<VisibleTestCase[]>([]) // visible test cases
  const [totalCases, setTotalCases] = useState<number>(0) // total test cases

  const { toast } = useToast();
  const defaultCode = `''' \nChallenge Description: \n ${challengeDescription}\n'''\nimport sys\n${challengeArguments}`;

  // updating code state variable has text
  function handleEditorChange(value: string | undefined) {
    if (typeof value === "string") {
      setCode(value);
      setIsDirty(true); // mark form as dirty
    } else {
      console.error("Editor value is not a string:", value);
    }
  }

  // submitting code via post request
  const submitCode = async () => {
    toast({
      variant: "default",
      title: `Testing code...`,
      description: "Your code is being run at this moment. Please wait",
    });

    try {
      const response = await fetch("/api/submitCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code, challengeId: params.id }),
        credentials: "include", // Include cookies in the request
      });

      const data = await response.json();

      let execResult = data.result;
      let failed = data.failed;
      let total = data.total;

      if (data.visibleTestCases !== undefined) {
        setVisibleTestCases(data.visibleTestCases);
      }
      setTotalCases(total);

      let variant: "default" | "destructive" | "success" = "destructive";

      if (typeof execResult == "string") {
        let description = `Your code failed ${failed}/${total} test cases, try again`;

        if (execResult.toLocaleLowerCase() == "passed") {
          description = "Your code passed all test cases, well done!";
          variant = "success";
        } else if (execResult.toLocaleLowerCase() !== "failed") {
          description = "Try another challenge!";
          variant = "success";
          setVisibleTestCases([]);
        }

        toast({
          variant: variant,
          title: `${execResult}`,
          description: description,
        });

        setIsDirty(false); // mark form as clean
      } else {
        console.error("[challenge/[id]/page.tsx] Code execution is not a string..");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: `Something went wrong!`,
        description: "Your code caused an error or it was an internal issue",
      });
    }
  };

  // getting challenge data
  useEffect(() => {
    // ensuring authentication has loaded
    if (status === "loading") {
      return;
    }

    const fetchChallengeData = async () => {
      try {
        const response = await fetch("/api/getChallenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ challengeId: params.id }),
          credentials: "include", // Include cookies in the request
        });

        const data = await response.json();
        setChallengeData(data);

        let desc = data.description;
        let words = desc.split(/\s+/);

        let formattedDescription = ' ';
        for (let i = 0; i < words.length; i++) {
          formattedDescription += words[i] + ' ';
          if ((i + 1) % 10 === 0) {
            formattedDescription += '\n  ';
          }
        }

        let args = "\n# <- Challenge Arguments Go Here (you might have to convert the types)-> \n";
        data.arguments.forEach((element: string, index: number) => {
          args += `${element} = sys.argv[${index + 1}]\n`;
        });
        setChallengeArguments(args + "\n");
        setChallengeDescription(formattedDescription);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchChallengeData();
  }, [status]);

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (challengeData === undefined) return;
      try {
        const response = await fetch("/api/getUserById", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: challengeData.authorId }),
          credentials: "include", // Include cookies in the request
        });

        const data = await response.json();
        setAuthor(data.name || "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthorData();
  }, [challengeData]);

  const resetCode = () => {
    setCode(defaultCode);
    setIsDirty(false); // mark form as clean
  };

  if (challengeDescription === "") { return null; }

  // UI
  return (
    <Navigation path={"/dashboard"} marginTop="0">
      <div className="overflow-hidden h-screen">
        <div className="flex gap-2 w-screen items-center justify-center" style={{ marginTop: "80px" }}>
          {/* Editor Section */}
          <Card className="p-2 animate-flyBottom">
            <Editor
              height="85vh"
              width="60vw"
              theme="moon"
              value={code}
              onChange={handleEditorChange}
              defaultLanguage="python"
              defaultValue={defaultCode}
            />
          </Card>
          {/* Challenge Info Section */}
          <Card className="w-[23vw] p-4 h-[87vh] animate-flyTop relative">
            <div className="relative flex flex-col items-center gap-3 p-6">
              <Button className="absolute left-3 top-3 w-6 h-6" variant={"outline"} size={"icon"} onClick={() => window.history.back()}>
                <ArrowLeft size={15} />
              </Button>
              <h1 className="text-xl font-extrabold text-white">
                {challengeData?.name}
              </h1>
              <div className="mt-[-15px] font-light text-gray-400 space-y-1 w-full">
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Author:</span> {author || ""}</p>
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Difficulty:</span> {challengeData?.difficulty}</p>
                <Separator className="my-2" />
                <p><span className="font-semibold text-white">Points:</span> {challengeData?.points}</p>
                <Separator className="my-2" />
              </div>
            </div>
            <div className="mt-4 flex flex-col h-fit items-center">
              <div className="w-5/6">
                {visibleTestCases.map((value: VisibleTestCase, index: number) => {
                  let result = value.result ? "Passed" : "Failed";
                  let inputs = value.input ? Object.values(value.input).join(', ') : "None";

                  return (
                    <Accordion type="single" collapsible key={index}>
                      <TestCase
                        position={index + 1}
                        inputs={inputs}
                        expectedOutput={value.expected}
                        receivedOutput={value.received}
                        result={result}
                      />
                    </Accordion>
                  );
                })}
              </div>
              {visibleTestCases.length > 0 ? (
                <p className="w-full text-center font-normal text-xs mt-4">{`${visibleTestCases.length} out of ${totalCases} test cases shown. Rest hidden.`}</p>
              ) : (
                <p className="w-full text-center font-normal text-xs mt-4">{`No test cases to show.`}</p>
              )}
              <Button variant="outline" className="w-1/2 mt-6" onClick={resetCode} disabled={!isDirty}>
                <RefreshCcw size={16} />
                <span className="ml-2">Reset</span>
              </Button>
              <Button className="w-1/2 mt-4" onClick={submitCode}>
                <PlayIcon size={16} />
                <span className="ml-2">Run</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Navigation>
  );
}
