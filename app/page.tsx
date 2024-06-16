"use client"
import { Button } from "@/components/ui/button";
import Navigation from "@/components/ui/navigation";
import { Editor, Monaco } from "@monaco-editor/react";
import { useState, useRef } from "react";


export default function Home() {
  const [code, setCode] = useState<string>(""); // code from the editor
  const [result, setResult] = useState<string>(""); // output from executing the code

  // updating code state variable has text h
  function handleEditorChange(value: any, event: any) {
    setCode(value);
  }

  const submitCode = function () {
    if (typeof code == "string" && code.length > 0) {
      fetch("/api/submit", {
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
    } else {
      setResult('Editor content is empty');
    }
  }
  

  return (
    <Navigation>
      <div className="flex justify-center">
        <Editor
          height="80vh"
          width="50vw"
          theme="vs-dark"
          value={code}
          onChange={handleEditorChange}
          defaultLanguage="python"
          defaultValue="# Print out hello world!"
        />
        <div className="flex flex-col">
          <textarea
            style={{ width: "25vw", backgroundColor: "black", height: "100%", color: "white", padding: "10px", boxSizing: "border-box" }}
            readOnly
            value={result}
          />
          <Button onClick={submitCode}>Submit</Button>
        </div>
      </div>
    </Navigation>
  );
}

