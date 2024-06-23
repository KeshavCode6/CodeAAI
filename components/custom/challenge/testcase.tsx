import React from 'react'
import {AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TestCaseProps{
    position:number,
    inputs:string,
    expectedOutput:string,
    receivedOutput:string,
    result:string;
}
export default function TestCase({position, inputs, expectedOutput, receivedOutput, result}:TestCaseProps) {
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
