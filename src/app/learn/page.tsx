"use client"

import { Navbar } from "@/components/utils/Navigation"
import Typewriter from 'typewriter-effect'; 
import { Dispatch, SetStateAction, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Button } from "@/components/ui/button"
import { ChevronRight, PlayIcon } from "lucide-react"
import axios from "axios";

export default function Learn() {

    const [showCodeEditor, setShowCodeEditor] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);

    return (
        <Navbar path="/learn">

            <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">

                <Stimulus setShowNextButton={setShowNextButton} setShowCodeEditor={setShowCodeEditor} text="Hello Shaurya! [p] Welcome to Code Nebula! [p] Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. [p] Try it out yourself!"/>

                {showCodeEditor ? <CodeEditorCard/> : <></>}

                {showNextButton ? <NextButton/> : <></>}

            </div>

        </Navbar>
    )

}

function Stimulus({ text, setShowNextButton, setShowCodeEditor } : {text: string, setShowNextButton: Dispatch<SetStateAction<boolean>>, setShowCodeEditor: Dispatch<SetStateAction<boolean>>}) {

    const textSplit = text.split("[p]");

    return (
        <div className="scroll-m-20 text-xl tracking-tight mt-20">
            <Typewriter
                options={{ delay: 25 }}
                onInit={(typewriter) => {

                    setTimeout(() => {
                        setShowCodeEditor(true);
                    }, textSplit.length * 1000 + text.length * 25 + 500)

                    for (const textSegment of textSplit) {
                        typewriter.typeString(textSegment)
                        .callFunction(() => {})
                        .pauseFor(1000)
                    }

                    typewriter.start()

                }}
            />
        </div>
    )

}

function CodeEditorCard() {

    const [editorContent, setEditorContent] = useState<string>("");
    const [outputContent, setOutputContent] = useState<string | null>(null);
    const [tutorialChallengeSolved, setTutorialChallengeSolved] = useState(false);

    const handleEditorDidMount = (editor : any , monaco : any) => {

        monaco.editor.defineTheme('code-nebula', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#00010a',
            }
        });

        monaco.editor.setTheme('code-nebula');

    }

    const attemptTutorialChallenge = async () => {

        const res = await axios.post("/api/attemptTutorialChallenge", { pythonCode: editorContent });
        const { codeOutput, success } = res.data;

        setOutputContent(codeOutput);
        setTutorialChallengeSolved(success);

    }

    return (
        <div className="mt-10 flex flex-col">
            <div className="bg-accent p-4 rounded-t-lg"></div>
            <div className="h-96 border flex flex-row">
                <Editor
                    width="60%"
                    height="100%"
                    defaultLanguage="python"
                    onMount={handleEditorDidMount}
                    onChange={(value : string | undefined) => setEditorContent(value || "")}
                    options={{
                        minimap: { enabled: true },
                        fontSize: 16,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        theme: "code-nebula"
                    }}
                />
                <div className="font-mono mt-2">
                    {outputContent || <span className="italic text-gray-500">Output will show here</span>}
                </div>
            </div>
            <Button className="flex items-center gap-x-2 self-center mt-6" variant="outline" onClick={attemptTutorialChallenge}>
                <PlayIcon/>
                Run
            </Button>
        </div>
    )

}

function NextButton() {
    return (
        <div className="mt-4 flex justify-end">
            <Button className="flex items-center">
                Next 
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}