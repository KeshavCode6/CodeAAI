import { ChallengeTestCaseProps } from "@/lib/utils";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// ChallengeTestCase component
export function ChallengeTestCase({ position, inputs, expectedOutput, receivedOutput, result }: ChallengeTestCaseProps) {
    return (
      <AccordionItem className="py-4" value={`item-${position}`}>
        <AccordionTrigger className="text-sm py-1">Visible Test Case #{position}</AccordionTrigger>
        <AccordionContent className="text-sm bg-black rounded-lg">
          <div className="flex flex-col p-4 w-full h-full">
            <span><span className="text-slate-400">Input:</span> {inputs}</span>
            <span><span className="text-slate-400">Expected Output:</span> {expectedOutput}</span>
            <span><span className="text-slate-400">Received Output:</span> {receivedOutput}</span>
            <span><span className="text-slate-400">Result:</span> {result}</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }
  