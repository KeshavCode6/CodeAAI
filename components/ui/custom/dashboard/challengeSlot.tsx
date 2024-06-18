import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Book, ChevronRight } from 'lucide-react'

export default function ChallengeSlot() {
    return (
        <div className='flex flex-col w-full border-b-2 border-slate-900 px-8  hover:bg-slate-900'>
            <div className='flex items-center w-full h-20 gap-1 border-white border-5'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className='flex'>
                        <div className='p-1'>
                            <Book size={38} />
                        </div>
                        <h3 className='flex flex-col items-start h-full'>
                            Easy Challenges
                            <span className='text-gray-500 m-0' style={{ fontSize: 10 }}>30 Completed | 100 unsolved | 100%</span>
                        </h3>
                    </div>
                    <Button variant={"outline"} size={"icon"} className='ml-20'>
                        <ChevronRight size={15} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
