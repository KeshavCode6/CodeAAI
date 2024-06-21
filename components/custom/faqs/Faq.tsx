"use client"
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQ(props: any) {

    const {question, children} = props;

    return (
        
        <div>
            <AccordionTrigger>
                <span>
                    {question}
                </span>
            </AccordionTrigger>
            <AccordionContent>
                {children}
            </AccordionContent>
        </div>
        
    )

}