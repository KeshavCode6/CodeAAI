"use client"
import { Navbar } from '@/components/utils/Navigation';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const ErrorPage = () => {
    const router = useRouter()
    return (
        <Navbar>
            <div className='w-screen h-[90vh] flex justify-center items-center gap-4'>
                <div className='flex flex-col'>
                    <h1
                        style={{
                            fontSize: '24px',
                            fontWeight: 500,
                        }}
                    >
                        404 - Page Not found
                    </h1>
                    <Button className='text-white mt-4' onClick={() => {router.push("/")}}>
                        Return home
                    </Button>
                </div>
            </div>
        </Navbar>
    );
};

export default ErrorPage;
