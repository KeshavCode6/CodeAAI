import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"


import Navigation from '@/components/custom/navigation'
import React from 'react'
import FAQ from "@/components/custom/faqs/FAQ"

const faqs = [
    {
        "question": "Erm what the sigma?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "How to get skibbidi Ohio rizz?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "Can I looxmax in 30 days?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "Do I have to pay the fanum tax?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "Erm what the sigma?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "How to get skibbidi Ohio rizz?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "Can I looxmax in 30 days?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
    {
        "question": "Do I have to pay the fanum tax?", 
        "answer": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }, 
]

// UNFINISHED
export default function Faqs() {

    return (
        <Navigation path={"/faqs"}>

            <div className="flex justify-center">
                <div className="flex flex-col gap-10 mt-10 w-[60vw]">
                    <span className="text-3xl text-center">Frequently Asked Questions</span>
                    <Accordion type="multiple" className="grid grid-cols-2 gap-x-20">
                        {faqs.map((faq, index) => (
                            <div>
                                <AccordionItem value={`item-${index + 1}`}>
                                    <FAQ question={faq.question}>
                                        {faq.answer}
                                    </FAQ>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>
                
            </div>
            
        </Navigation>
    )

}
