"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/custom/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor, loader } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import {
  BookCheck,
  CircleX,
  Clipboard,
  HelpCircle,
  LightbulbIcon,
  PlayIcon,
} from "lucide-react";
import axios from "axios";
import { protectedRoute } from "@/lib/protectedRoute";
import { IChallenge } from "@/lib/database/schemas/Challenge";

//@ts-ignore
import HeaderCard from "@/components/custom/card/headercard";

// challenge page, params.id is the id of the challenge
export default function Challenge({ params }: { params: { id: string } }) {
  const [code, setCode] = useState<string>(""); // code from the editor
  const [result, setResult] = useState<string>(""); // output from executing the code
  const { session, status } = protectedRoute(); // auth data
  const [challengeData, setChallengeData] = useState<IChallenge | undefined>(undefined); // loaded challenge data
  const [challengeDescription, setChallengeDescription] = useState<string>(""); // loaded challenge data

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
    axios.post("/api/submitCode", {code: code, challengeId: params.id,}, {withCredentials:true}).then((response) => {
        // getting execution result and making sure its a string
        let execResult = response.data.result;
        if (typeof execResult == "string") {
          setResult(execResult);
        } else {
          console.error(
            "[challenge/[id]/page.tsx] Code execution is not a string.."
          );
        }
      })
      .catch((error) => {
        // printing out errors
        console.error("Error:", error);
        setResult("Your code caused an error");
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
      let formattedDescription = '';
      for (let i = 0; i < words.length; i++) {
        formattedDescription += words[i] + ' ';
        if ((i + 1) % 10 === 0) {
          formattedDescription += '\n ';
        }
      }
  
      // Setting the formatted description in state
      setChallengeDescription(formattedDescription);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }, [status]);

  const resetCode = () => {
    setCode(`''' \nChallenge Description: \n ${challengeDescription}\n'''`);
  }

  if(challengeDescription==""){return;}
  // UI
  return (
    <Navigation path={"/challenge"}>
      <div className="flex gap-3" style={{ marginTop: "80px" }}>
        {/*Editor Section*/}
        <Card className="p-2 ml-[10vw] animate-flyBottom">
          <Editor
            height="85vh"
            width="60vw"
            theme="moon"
            value={code}
            onChange={handleEditorChange}
            defaultLanguage="python"
            defaultValue={`''' \n\nChallenge Description: \n ${challengeDescription}\n\n'''`}
          />
        </Card>

        {/*Output Section*/}
        <Tabs defaultValue="description" className="w-[400px] h-full">
          <HeaderCard
            className="w-[400px] h-[87vh] animate-flyTop"
            header={challengeData?.name}
          >
            <textarea
              className={`w-full text-sm bg-card h-full border-card p-[10px] resize-none focus:outline-none focus:bg-card font-mono`}
              readOnly
              placeholder="Click run to test out your code"
              value={result}
            />
            {/*Run and Help buttons*/}
            <div className="flex gap-1 justify-center">
              <Button
                className="gap-1 text-xs"
                size={"sm"}
                onClick={submitCode}
              >
                <PlayIcon size={15} /> Run
              </Button>
              <Button
                className="gap-1 text-xs"
                size={"sm"}
                onClick={resetCode}
              >
                <CircleX size={15} /> Reset Code
              </Button>
            </div>
          </HeaderCard>
        </Tabs>
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
