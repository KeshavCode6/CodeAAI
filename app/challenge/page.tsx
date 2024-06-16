"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/ui/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Editor, loader } from "@monaco-editor/react";
import { useState } from "react";
import { BookCheck, Clipboard, HelpCircle, LightbulbIcon, PlayIcon } from "lucide-react";


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
      <div className="flex justify-center items-center gap-1" style={{marginTop:"80px"}}>
        <Card className="p-2">
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
        <Card className="h-[87vh]">
          <Tabs defaultValue="description" className="w-[400px] h-full">
            <TabsList className="px-4 w-full">
              <TabsTrigger className="gap-1 flex" value="description"><Clipboard size={15}/> Description</TabsTrigger>
              <TabsTrigger className="gap-1 flex"  value="result"><BookCheck size={15}/> Test</TabsTrigger>
              <TabsTrigger className="gap-1 flex"  value="12"><LightbulbIcon fill="white" size={15}/> Hints</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="px-4">
              <h5>Sally Sue's Skibidi toilet</h5>
              <p className="text-xs text-gray-300">Write a program to solve sally sues spedness</p>
            </TabsContent>
            <TabsContent className="h-[70vh]" value="result">
              <textarea
                className={`w-full text-sm bg-card h-full border-card p-[10px] resize-none resize-none focus:outline-none focus:bg-card`}
                readOnly
                placeholder="Click run to test out your code"
                value={result}
              />
            </TabsContent>
            <TabsContent value="description"></TabsContent>
          </Tabs>
          <div className="w-full flex justify-center" style={{flexGrow:1, }}>
            <div className="flex absolute gap-1 bottom-10">
              <Button className="gap-1 text-xs" size={"sm"} onClick={submitCode}><PlayIcon size={15}/> Run</Button>
              <Button className="gap-1 text-xs" size={"sm"} onClick={submitCode}><HelpCircle size={15}/> Help</Button>
            </div>
          </div>
        </Card>
      </div>
    </Navigation>
  );
}


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
