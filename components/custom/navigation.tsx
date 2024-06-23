"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { Bell, Settings, GalleryThumbnailsIcon } from "lucide-react";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";

export const links: { [key: string]: string } = {
  Home: "/",
  Dashboard: "/dashboard",
  Contact: "/contact",
  FAQs: "/faqs",
};

interface NavbarProps {
  path?: string;
  marginTop?:string;
  children?: React.ReactNode;
}

export default function Navigation({ children, path, marginTop="4rem" }: NavbarProps) {
  const { data: session, status } = useSession();
  
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
        {status === "authenticated" ? (
        <div className="flex items-center justify-center gap-2">
          <Popover>
            <PopoverTrigger className="flex items-center">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <img src={session?.user?.image || "/assets/avatar/image.png"} className="rounded-full" />
                <span className="sr-only">User menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="relative z-[1] flex flex-col items-center mr-5">
                <div className="flex flex-row gap-3 mb-12">
                    <img src={session?.user?.image || "..."} className="rounded-full w-12 h-12 aspect-square" />
                    <div className="flex flex-col">
                        <span className="text-lg w-40">{session?.user?.name || "..." }</span>
                        <span className="text-xs w-40">{session?.user?.email || "..." }</span>
                    </div>
                </div>
              <Button className="absolute right-2 bottom-2 text-xs" size={"sm"} onClick={() => {signOut()}}>Sign out</Button>
            </PopoverContent>
          </Popover>
        </div>
        ) : (
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        )}
      </div>

      <div style={{marginTop:marginTop}}>{children}</div>
    </>
  );
}
