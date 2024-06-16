"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import Navigation from "@/components/ui/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor, loader } from "@monaco-editor/react";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useState } from "react";

loader.init().then((monaco) => {
  monaco.editor.defineTheme('moon', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: '', foreground: 'D4D4D4' }, // Default text color: gray
      { token: 'keyword', foreground: '569CD6' }, // Keywords: blue
      { token: 'string', foreground: 'CE9178' }, // Strings: salmon
      { token: 'number', foreground: '9CDCFE' }, // Numbers: light blue
      { token: 'comment', foreground: '6A9955' }, // Comments: green
      { token: 'delimiter', foreground: 'B8D7A3' }, // Punctuation: light green
      { token: 'variable', foreground: 'DCDCAA' }, // Variables: light yellow
      { token: 'type', foreground: '4EC9B0' }, // Types (Classes, Interfaces): teal
      { token: 'constant', foreground: 'B5CEA8' }, // Constants: light green
      { token: 'property', foreground: 'D4D4D4' }, // Properties: gray
      { token: 'method', foreground: '9CDCFE' }, // Methods: light blue
      { token: 'builtin', foreground: 'D4D4D4' }, // Built-in Functions: gray
      { token: 'attribute', foreground: 'DCDCAA' }, // Attributes: light yellow
      { token: 'operator', foreground: 'B5CEA8' }, // Operators: light green
      { token: 'function', foreground: 'D8A3FF' }, // Functions: purple
    ],
    colors: {
      'editor.background': '#020817', // Editor background color
      'editorCursor.foreground': '#569CD6', // Cursor color
      'editor.lineHighlightBackground': '#00000000', // Active line background color
      'editorBracketMatch.background': '#00000000', // Transparent bracket match background
      'editorBracketMatch.border': '#00000000', // Transparent bracket match border
      'editorLineNumber.foreground': '#858585', // Line number color
      'editorLineNumber.activeForeground': '#FFFFFF', // Active line number color
      'editor.lineHighlightBorder': '#00000000', // Transparent line highlight border
      'editorOverviewRuler.border': '#00000000', // Transparent overview ruler border
    },
  });
  monaco.editor.setTheme('moon');
});

export default function Challenge() {

  const [code, setCode] = useState<string>(""); // code from the editor
  const [result, setResult] = useState<string>(""); // output from executing the code

  // updating code state variable has text h
  function handleEditorChange(value: any, event: any) {
    setCode(value);
  }

  const submitCode = function () {
    fetch("/api/submitCode", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ code })
    })
      .then(response => response.json())
      .then(data => {
        setResult(data.result);
      })
      .catch(error => {
        console.error('Error:', error);
        setResult('An error occurred');
      });
  }

  return (
    <Navigation>
      <Card className="absolute left-2 top-20 p-2">
        <Editor
          height="85vh"
          width="60vw"
          theme="moon"
          value={code}
          onChange={handleEditorChange}
          defaultLanguage="python"
          defaultValue="# Print out hello world!"
        />
      </Card>
      <div className="absolute right-2 top-20">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">

          </TabsContent>
          <TabsContent value="password"></TabsContent>
        </Tabs>

        <textarea
          className={`w-[25vw] bg-zinc-950 h-full text-white p-[10px] box-border font-mono resize-none rounded-[30px] ${(result == "") ? ("italic") : ("")}`}
          readOnly
          value={(result == "") ? ("Code editor is empty") : result}
        />
        <Button onClick={submitCode}>Submit</Button>
      </div>
    </Navigation>
  );
}
