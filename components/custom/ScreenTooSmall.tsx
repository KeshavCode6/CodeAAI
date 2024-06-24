import React from 'react'
import { Button } from '../ui/button';
import { ArrowLeft, Monitor, RefreshCw } from 'lucide-react';

export default function ScreenTooSmall() {
    return (
        <div className="flex flex-col mt-24 p-5 gap-10">
            <Monitor size={200} className="self-center" />
            <div className="flex flex-col">
                <span className="text-center text-3xl">STOP!</span>
                <span className="text-center mt-3 text-xl w-96 self-center font-thin">This part of the website is best experienced on larger screens.</span>
            </div>
            <div className="flex flex-col gap-3">
                <a href="/" className="self-center">
                    <Button className="w-56 flex gap-2">
                        <ArrowLeft />
                        <span>Return to Home</span>
                    </Button>
                </a>
                <Button className="w-40 flex gap-2 self-center" variant="outline" onClick={() => {
                        location.reload();
                    }}>
                        <RefreshCw />
                        <span>Retry</span>
                    </Button>
            </div>
        </div>
    );
}
