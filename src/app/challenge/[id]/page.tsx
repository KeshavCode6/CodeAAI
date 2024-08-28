"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {Sidebar} from "@/components/Navigation";
import { Editor, loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { RefreshCcw, PlayIcon, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import {ThreeDots} from "@/components/Threedots"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// Define VisibleTestCase interface
interface VisibleTestCase {
  input?: Record<string, any>;
  expected: string;
  received: string;
  result: boolean;
}

interface TestCaseProps{
  position:number,
  inputs:string,
  expectedOutput:string,
  receivedOutput:string,
  result:string;
}
function TestCase({position, inputs, expectedOutput, receivedOutput, result}:TestCaseProps) {
  return (
      <AccordionItem className="py-4" value={`item-${position}`}>
          <AccordionTrigger className="text-sm py-1">Visible Test Case #{position}</AccordionTrigger>
          <AccordionContent className="text-sm  bg-black rounded-lg">
              <div className="flex flex-col p-4 w-full h-full">
                  <span><span className="text-slate-400">Input:</span> {inputs}</span>
                  <span><span className="text-slate-400">Expected Output:</span> {expectedOutput}</span>
                  <span><span className="text-slate-400">Recieved Output:</span> {receivedOutput}</span>
                  <span><span className="text-slate-400">Result:</span> {result}</span>
              </div>
          </AccordionContent>
      </AccordionItem>
  )
}

// challenge page, params.id is the id of the challenge
export default function Challenge({ params }: { params: { id: string } }) {
  const [code, setCode] = useState<string>(""); // code from the editor
  const [isDirty, setIsDirty] = useState<boolean>(false); // track unsaved changes
  const { data:session, status } = useSession(); // auth data
  const [challengeData, setChallengeData] = useState<any>(undefined); // loaded challenge data
  const [challengeDescription, setChallengeDescription] = useState<string>(""); // loaded challenge data
  const [challengeArguments, setChallengeArguments] = useState<string>(""); // loaded challenge data
  const [author, setAuthor] = useState<string>(""); // loaded challenge data
  const [visibleTestCases, setVisibleTestCases] = useState<VisibleTestCase[]>([]) // visible test cases
  const [totalCases, setTotalCases] = useState<number>(0) // total test cases
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side

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
        setChallengeData(data.challengeData);
        setAuthor(data.name.name)
        
        let desc = data.challengeData.description;
        let words = desc.split(/\s+/);

        let formattedDescription = ' ';
        for (let i = 0; i < words.length; i++) {
          formattedDescription += words[i] + ' ';
          if ((i + 1) % 10 === 0) {
            formattedDescription += '\n  ';
          }
        }

        let args = "\n# <- Challenge Arguments Go Here (you might have to convert the types)-> \n";
        data.challengeData.arguments.forEach((element: string, index: number) => {
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

  const resetCode = () => {
    setCode(defaultCode);
    setIsDirty(false); // mark form as clean
  };

  useEffect(() => {
    setIsClient(true);
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("moon", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "D4D4D4" },
          { token: "keyword", foreground: "569CD6" },
          { token: "string", foreground: "CE9178" },
          { token: "number", foreground: "9CDCFE" },
          { token: "comment", foreground: "6A9955" },
          { token: "delimiter", foreground: "B8D7A3" },
          { token: "variable", foreground: "DCDCAA" },
          { token: "type", foreground: "4EC9B0" },
          { token: "constant", foreground: "B5CEA8" },
          { token: "property", foreground: "D4D4D4" },
          { token: "method", foreground: "9CDCFE" },
          { token: "builtin", foreground: "D4D4D4" },
          { token: "attribute", foreground: "DCDCAA" },
          { token: "operator", foreground: "B5CEA8" },
          { token: "function", foreground: "D8A3FF" },
        ],
        colors: {
          "editor.background": "#020817",
          "editorCursor.foreground": "#569CD6",
          "editor.lineHighlightBackground": "#00000000",
          "editorBracketMatch.background": "#00000000",
          "editorBracketMatch.border": "#00000000",
          "editorLineNumber.foreground": "#858585",
          "editorLineNumber.activeForeground": "#FFFFFF",
          "editor.lineHighlightBorder": "#00000000",
          "editorOverviewRuler.border": "#00000000",
        },
      });
    });
  }, []);


  if(!challengeDescription){
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    ); // Customize your loading state
  }


  // UI
  return (
    <Sidebar path={"/dashboard"}>
      <div className="overflow-hidden h-[90vh]">
        <div className="flex gap-2 w-screen items-center justify-center" style={{ marginTop: "80px" }}>
          {/* Editor Section */}
          <Card className="p-2 animate-flyBottom">
            {isClient && (
            <Editor
            height="85vh"
            width="60vw"
            theme="moon"
            value={code}
            onChange={handleEditorChange}
            defaultLanguage="python"
            defaultValue={defaultCode}
          />
            )}
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
    </Sidebar>
  );
}
