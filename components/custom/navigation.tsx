"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import React from "react";
import { Bell, Settings, User, GalleryThumbnailsIcon } from "lucide-react";
import { Button } from "../ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const links: { [key: string]: string } = {
  Home: "/",
  Dashboard: "/dashboard",
  Contact: "/contact",
  FAQs: "/faq",
};

interface NavbarProps {
  path?: string;
  children?: React.ReactNode;
}

export default function Navigation({ children, path }: NavbarProps) {
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
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-9 h-9"
          >
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-9 h-9"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full w-9 h-9"
              >
                <User fill="white" className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-[1] flex flex-col items-center mr-5">
                <div className="flex flex-row gap-3">
                    <img src={session?.user?.image || "/assets/avatar/image.png"} className="rounded-full w-20" />
                    <div className="flex flex-col">
                        <span className="text-xl w-40">{session?.user?.name || "/assets/avatar/image.png" }</span>
                        <span className="text-lg w-40">{session?.user?.email || "/assets/avatar/image.png" }</span>
                    </div>
                </div>
              <Button onClick={() => {signOut()}} className="w-20">Sign out</Button>
            </PopoverContent>
          </Popover>
        </div>
        ) : (
            <Button asChild>
                <Link href="/login">Login</Link>
            </Button>
        )}
      </div>

      <div className="mt-[4rem]">{children}</div>
    </>
  );
}
