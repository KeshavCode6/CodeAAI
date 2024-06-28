"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import { Editor, loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { RefreshCcw, PlayIcon, ArrowLeft } from "lucide-react";
import axios from "axios";
import { useProtectedRoute } from "@/lib/protectedRoute";
import { IChallenge } from "@/lib/database/schemas/Challenge";
import { useToast } from "@/components/ui/use-toast";
import { Accordion } from "@radix-ui/react-accordion";
import TestCase from "@/components/custom/challenge/testcase";
import { VisibleTestCase } from "@/app/api/submitCode/route";
import { Separator } from "@/components/ui/separator";

// challenge page, params.id is the id of the challenge
export default function Challenge({ params }: { params: { id: string } }) {
  const [code, setCode] = useState<string>(""); // code from the editor
  const [isDirty, setIsDirty] = useState<boolean>(false); // track unsaved changes
  const { session, status } = useProtectedRoute(); // auth data
  const [challengeData, setChallengeData] = useState<IChallenge | undefined>(undefined); // loaded challenge data
  const [challengeDescription, setChallengeDescription] = useState<string>(""); // loaded challenge data
  const [challengeArguments, setChallengeArguments] = useState<string>(""); // loaded challenge data
  const [author, setAuthor] = useState<string>(""); // loaded challenge data
  const [visibleTestCases, setVisibleTestCases] = useState<VisibleTestCase[]>([]) // visisble test cases
  const [totalCases, setTotalCases] = useState<number>(0) // visisble test cases

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
  const submitCode = function () {
    toast({
      variant: "default",
      title: `Testing code...`,
      description: "Your code is being run at this moment. Please wait",
    });

    //@ts-ignore : have to tsx ignore because nextauth doesnt know we added a custom id param on login
    axios.post("/api/submitCode", { code: code, challengeId: params.id }, { withCredentials: true }).then((response) => {
      // getting execution result and making sure its a string
      let execResult = response.data.result;
      let failed = response.data.failed;
      let total = response.data.total;

      if(typeof response.data.visibleTestCases !== "undefined"){
        setVisibleTestCases(response.data.visibleTestCases)
      }
      setTotalCases(total);

      let variant: "default" | "destructive" | "success" = "destructive";

      if (typeof execResult == "string") {
        let description = `Your code failed ${failed}/${total} test cases, try again`;

        if (execResult.toLocaleLowerCase() == "passed") {
          description = "Your code passed all test cases, well done!";
          variant = "success";
        } else if(execResult.toLocaleLowerCase()!=="failed"){
          description = "Try another challenge!";
          variant = "success";
          setVisibleTestCases([])
        }

        toast({
          variant: variant,
          title: `${execResult}`,
          description: description,
        });

        setIsDirty(false); // mark form as clean
      } else {
        console.error(
          "[challenge/[id]/page.tsx] Code execution is not a string.."
        );
      }
    }).catch((error) => {
      // printing out errors
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: `Something went wrong!`,
        description: "Your code caused an error or it was an internal issue",
      });
    });
  };

  // getting challenge data
  useEffect(() => {
    // ensuring authentication has loaded
    if (status === "loading") {
      return;
    }

    //@ts-ignore getting challenge data via post request
    axios.post("/api/getChallenge", { challengeId: params.id }, { withCredentials: true }).then((response) => {
      // Extracting and formatting description
      //@ts-ignore
      setChallengeData(response.data);

      let desc = response.data.description;
      // Splitting the description into words
      let words = desc.split(/\s+/);

      // Adding a new line every 10 words
      let formattedDescription = ' ';
      for (let i = 0; i < words.length; i++) {
        formattedDescription += words[i] + ' ';
        if ((i + 1) % 10 === 0) {
          formattedDescription += '\n  ';
        }
      }

      let args = "\n# <- Challenge Arguments Go Here (you might have to convert the types)-> \n";
      response.data.arguments.forEach((element: string, index: number) => {
        args += `${element} = sys.argv[${index+1}]\n`;
      });
      setChallengeArguments(args + "\n");

      // Setting the formatted description in state
      setChallengeDescription(formattedDescription);
    }).catch((error) => {
      console.error("Error:", error);
    });
  }, [status]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = "You have unsaved changes, are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        submitCode();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDirty]);

  useEffect(()=>{
    if(typeof challengeData == "undefined"){return;}
    axios.post("/api/getUserById", {id:challengeData?.authorId}).then(response=>{
      setAuthor(response.data.name || "")
    }).catch((error:any)=>{
      console.error(error)
    })
  }, [challengeData])

  const resetCode = () => {
    setCode(defaultCode);
    setIsDirty(false); // mark form as clean
  }

  if (challengeDescription === "") { return null; }
  // UI
  return (
    <Navigation path={"/dashboard"} marginTop="0">
      <div className="overflow-hidden h-screen">
        <div className="flex gap-2 w-screen items-center justify-center" style={{ marginTop: "80px" }}>
          {/*Editor Section*/}
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
          {/*Challenge Info Section*/}
          <Card className="w-[23vw] p-4 h-[87vh] animate-flyTop relative">
          <div className="relative flex flex-col items-center gap-3 p-6 ">
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
              {visibleTestCases.length>0 ? (
                <p className="w-full text-center font-normal text-xs mt-4">{`${visibleTestCases.length} out of ${totalCases} test cases shown. Rest hidden.`}</p>
              ):(
                <p className="w-full text-center font-normal text-xs mt-4">Test your code using the run button below</p>
              )}

              {/*Run and Help buttons*/}
              <div className="flex gap-1 justify-center items-center absolute bottom-5 left-0 right-0">
                <Button className="gap-1 text-xs" variant={"outline"}  size={"sm"} onClick={submitCode}>
                  <PlayIcon size={15} /> Run
                </Button>
                <Button className="gap-1 text-xs" variant={"destructive"} size={"sm"} onClick={resetCode}>
                  <RefreshCcw size={15} /> Reset
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Navigation>
  );
}

// editor customs styling called 'moon'
loader.init().then((monaco) => {
  monaco.editor.defineTheme("moon", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "", foreground: "D4D4D4" }, // Default text color: gray
      { token: "keyword", foreground: "569CD6" }, // Keywords: blue
      { token: "string", foreground: "CE9178" }, // Strings: salmon
      { token: "number", foreground: "9CDCFE" }, // Numbers: light blue
      { token: "comment", foreground: "6A9955" }, // Comments: green
      { token: "delimiter", foreground: "B8D7A3" }, // Punctuation: light green
      { token: "variable", foreground: "DCDCAA" }, // Variables: light yellow
      { token: "type", foreground: "4EC9B0" }, // Types (Classes, Interfaces): teal
      { token: "constant", foreground: "B5CEA8" }, // Constants: light green
      { token: "property", foreground: "D4D4D4" }, // Properties: gray
      { token: "method", foreground: "9CDCFE" }, // Methods: light blue
      { token: "builtin", foreground: "D4D4D4" }, // Built-in Functions: gray
      { token: "attribute", foreground: "DCDCAA" }, // Attributes: light yellow
      { token: "operator", foreground: "B5CEA8" }, // Operators: light green
      { token: "function", foreground: "D8A3FF" }, // Functions: purple
    ],
    colors: {
      "editor.background": "#020817", // Editor background color
      "editorCursor.foreground": "#569CD6", // Cursor color
      "editor.lineHighlightBackground": "#00000000", // Active line background color
      "editorBracketMatch.background": "#00000000", // Transparent bracket match background
      "editorBracketMatch.border": "#00000000", // Transparent bracket match border
      "editorLineNumber.foreground": "#858585", // Line number color
      "editorLineNumber.activeForeground": "#FFFFFF", // Active line number color
      "editor.lineHighlightBorder": "#00000000", // Transparent line highlight border
      "editorOverviewRuler.border": "#00000000", // Transparent overview ruler border
    },
  });
});
