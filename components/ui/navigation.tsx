import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "./navigation-menu";
import React from 'react';
import { Bell, Facebook, FactoryIcon, GalleryThumbnailsIcon, Settings, User, WebhookIcon } from "lucide-react";
import { Button } from "./button";

interface NavbarProps {
    children?: React.ReactNode;
}
export default function Navigation({ children }: NavbarProps) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 flex justify-between px-16 items-center bg-slate-950/[.85] backdrop-blur h-16 shadow-sm shadow-slate-900 z-[1]">
                <div className="flex items-center">
                    <div className="flex gap-1 mr-9">
                        <GalleryThumbnailsIcon />
                        Code AAI
                    </div>
                    <NavigationMenu>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Home
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/about" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                        </Link>
                        <Link href="/challenges" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Challenges
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenu>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
                        <Settings className="h-5 w-5" />
                        <span className="sr-only">Settings</span>
                    </Button>
                    <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
                        <User fill="white" className="h-5 w-5" />
                        <span className="sr-only">User menu</span>
                    </Button>
                </div>
            </div>

            <div className="mt-20">
                {children}
            </div>
            
            {/* <footer className="mb-10">
                <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-4">
                    <hr className="my-0 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">@ 2024 Code AAI
                        </span>
                        <div className="flex mt-2 sm:justify-center sm:mt-0">
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Facebook page</span>
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-3">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                                </svg>
                                <span className="sr-only">Discord community</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer > */}
        </>
    );
}
