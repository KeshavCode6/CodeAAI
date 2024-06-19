import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "../ui/navigation-menu";
import React from 'react';
import { Bell, Settings, User, GalleryThumbnailsIcon } from "lucide-react";
import { Button } from "../ui/button";

export const links: { [key: string]: string } = {
    Home: "/",
    Dashboard: "/dashboard",
    Contact: "/contact",
    FAQs:"/faq"
};

interface NavbarProps {
    path?: string;
    children?: React.ReactNode;
}

export default function Navigation({ children, path }: NavbarProps) {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 flex justify-between px-16 items-center bg-slate-950/[.85] backdrop-blur h-16 shadow-sm shadow-slate-900 z-[1]">
                <div className="flex items-center">
                    <div className="flex gap-1 mr-9">
                        <GalleryThumbnailsIcon />
                        Code AAI
                    </div>
                    <NavigationMenu>
                        {Object.keys(links).map((value, index) => {
                            let eClass = navigationMenuTriggerStyle();
                            if (path === links[value]) {
                                eClass += " underline underline-offset-4";
                            }
                            return (
                                <Link href={links[value]} legacyBehavior passHref key={index}>
                                    <NavigationMenuLink className={eClass}>
                                        {value}
                                    </NavigationMenuLink>
                                </Link>
                            );
                        })}
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

            <div className="mt-[4rem]">
                {children}
            </div>
        </>
    );
}
