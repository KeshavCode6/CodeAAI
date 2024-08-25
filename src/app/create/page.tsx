"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Editor, loader } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/Navigation";
import { ThreeDots } from "@/components/Threedots";

export default function CreateChallenge() {
  const [editorContent, setEditorContent] = useState(defaultJson);
  const [enteredSecretKey, setEnteredSecretKey] = useState("");
  const [isClient, setIsClient] = useState(false); // Track if we are on the client side
  const { data: session, status } = useSession();
  const { toast } = useToast();

  // Ensure code runs only on the client side
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

  const handleEditorContentChange = (value: any) => {
    setEditorContent(value);
  };

  const handleEnteredSecretKeyChange = (value: any) => {
    setEnteredSecretKey(value.target.value);
  };

  const createChallenge = () => {
    fetch("/api/createChallenge", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeData: editorContent,
        secretKey: enteredSecretKey,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast({
            variant: "success",
            title: "Challenge Created Successfully",
            description: "Your challenge has been created!",
          });
        } else if (data.status === 403) {
          toast({
            variant: "destructive",
            title: "Incorrect Secret Key",
            description:
              "The secret key you entered is invalid. If you believe this is a mistake, please contact a Code AAI staff member.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.message
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
          "An unexpected error occurred during the creation of this challenge. If the problem persists, please contact a Code AAI staff member.",
        });
      });
  };

  if (!isClient) {
    return <ThreeDots />;
  }

  return (
    <Sidebar path="/create">
      <div className="flex justify-center">
        <div className="flex justify-center flex-col">
          <span className="text-3xl w-full text-center mt-5">Creating a Challenge</span>
          <Card className="p-1 w-[70vw] min-w-[20rem] mt-2 mb-2">
            <Editor
              height="65vh"
              theme="moon"
              value={editorContent}
              onChange={handleEditorContentChange}
              defaultLanguage="json"
            />
          </Card>

          <div className="flex flex-row gap-2">
            <Input
              placeholder="Enter secret key"
              type="password"
              onChange={handleEnteredSecretKeyChange}
            />
            <Button className="w-40" onClick={createChallenge}>
              Create
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

const defaultJson = `
{
  "name": "Example Challenge",
  "id": "example_challenge_1",
  "description": "This is an example challenge description.",
  "arguments": ["arg1", "arg2"],
  "difficulty": "Medium",
  "points": 100,
  "isDaily": false,
  "testCases": [
    {
      "args": {},
      "output": 0
    },
    {
      "args": {},
      "output": 0
    }
  ]
}
`;
