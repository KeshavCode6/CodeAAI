"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import { Editor, loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import {
  CircleX,
  PlayIcon,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { protectedRoute } from "@/lib/protectedRoute";
import { IChallenge } from "@/lib/database/schemas/Challenge";
import { useToast } from "@/components/ui/use-toast"
import { Accordion } from "@radix-ui/react-accordion";
import TestCase from "@/components/custom/challenge/testcase";

// challenge page, params.id is the id of the challenge
export default function Challenge({ params }: { params: { id: string } }) {
  const [code, setCode] = useState<string>(""); // code from the editor
  const { session, status } = protectedRoute(); // auth data
  const [challengeData, setChallengeData] = useState<IChallenge | undefined>(undefined); // loaded challenge data
  const [challengeDescription, setChallengeDescription] = useState<string>(""); // loaded challenge data
  const [challengeArguments, setChallengeArguments] = useState<string>(""); // loaded challenge data
  const { toast } = useToast()
  const defaultCode = `''' \nChallenge Description: \n ${challengeDescription}\n'''\nimport sys\n${challengeArguments}`;

  // updating code state variable has text
  function handleEditorChange(value: string | undefined) {
    if (typeof value === "string") {
      setCode(value);
    } else {
      console.error("Editor value is not a string:", value);
    }
  }

  // submitting code via post request
  const submitCode = function () {
    //@ts-ignore : have to tsx ignore because nextauth doesnt know we added a custom id param on login
    axios.post("/api/submitCode", { code: code, challengeId: params.id, }, { withCredentials: true }).then((response) => {
      // getting execution result and making sure its a string
      let execResult = response.data.result;
      let variant: "default" | "destructive" | "success" = "destructive"

      if (typeof execResult == "string") {
        let description = "Your code failed 1/1000 test cases, try again"

        if (execResult == "passed") {
          description = "Your code passed all test cases, well done!"
          variant = "success"
        }
        else {
          description = "Try another challenge!"
          variant = "success"
        }

        toast({
          variant: variant,
          title: `${execResult}`,
          description: description,
        })

      } else {
        console.error(
          "[challenge/[id]/page.tsx] Code execution is not a string.."
        );
      }
    })
      .catch((error) => {
        // printing out errors
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: `Something went wrong!`,
          description: "Your code caused an error or it was an internal issue",
        })
      });
  };

  // getting challenge data
  useEffect(() => {
    // ensuring authentication has loaded
    if (status === "loading") {
      return;
    }

    //@ts-ignore getting challenge data via post request
    axios.post("/api/getChallenge", { challengeId: params.id }, { withCredentials: true })
      .then((response) => {
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

        let args = "\n# <- Challenge Arguments Go Here -> \n"
        response.data.arguments.forEach((element: string, index: number) => {
          args += `${element} = sys.argv[${index}]\n`
        });
        console.log(args)
        setChallengeArguments(args + "\n")

        // Setting the formatted description in state
        setChallengeDescription(formattedDescription);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [status]);

  const resetCode = () => {
    setCode(defaultCode);
  }

  if (challengeDescription == "") { return; }
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
            <div className="flex flex-col items-center gap-3">
              <Button className="absolute left-3 top-3 w-6 h-6" size={"icon"} onClick={() => window.history.back()}>
                <ArrowLeft size={15} />
              </Button>
              <p className="text-center font-light">
                <h1 className="text-xl font-bold underline underline-offset-7">{challengeData?.name}</h1>
                <span className="font-semibold">Difficulty: </span>{challengeData?.difficulty}<br />
                <span className="font-semibold">Points: </span>{challengeData?.points}<br />
              </p>
            </div>

            <div className="mt-4 flex flex-col h-fit items-center">
              <div className="w-5/6">
              <Accordion type="single" collapsible>
                <TestCase position={1} inputs="None" expectedOutput="Hello Sam" recievedOuput="Bye Sam" result="Fail"/>
              </Accordion>
              </div>
            </div>
            <p className="w-full text-center font-normal text-xs mt-4">1 out of 1000 test cases shown. Rest hidden.</p>

            {/*Run and Help buttons*/}
            <div className="flex gap-1 justify-center items-center absolute bottom-5 left-0 right-0">
              <Button className="gap-1 text-xs" size={"sm"} onClick={submitCode}>
                <PlayIcon size={15} /> Run
              </Button>
              <Button className="gap-1 text-xs" size={"sm"} onClick={resetCode}>
                <CircleX size={15} /> Reset
              </Button>
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
