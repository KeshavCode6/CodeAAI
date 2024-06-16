"use client"
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";


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

      <div className="flex justify-center rounded-full">
        <Editor
          height="80vh"
          width="40vw"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          defaultLanguage="python"
          defaultValue="# Print out hello world!"
        />
        <div className="flex flex-col">
          <textarea
            className={`w-[25vw] bg-zinc-950 h-full text-white p-[10px] box-border font-mono resize-none rounded-[30px] ${(result == "") ? ("italic") : ("")}`}
            readOnly
            value={(result == "") ? ("Code editor is empty") : result}
          />
          <Button onClick={submitCode}>Submit</Button>
        </div>

      </div>

    </Navigation>
  );
}

