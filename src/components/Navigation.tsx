"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GalleryThumbnailsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const links: { [key: string]: string } = {
  Home: "/",
  Dashboard: "/dashboard",
  Contact: "/contact",
  FAQs: "/faqs",
};

interface NavbarProps {
  path?: string;
  marginTop?: string;
  children?: React.ReactNode;
}

export default function Navigation({ children, path, marginTop = "4rem" }: NavbarProps) {
  const { data: session, status } = useSession();
  const [hydrated, setHydrated] = useState(false);

  // fixing wacky hydration errors
  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return null
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between px-16 items-center bg-slate-950/[.85] backdrop-blur h-16 shadow-sm shadow-slate-900 z-[1]" suppressHydrationWarning>
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
                <Link href={links[value]} passHref key={index} suppressHydrationWarning>
                  <NavigationMenuLink className={eClass}>
                    {value}
                  </NavigationMenuLink>
                </Link>
              );
            })}
          </NavigationMenu>
        </div>
        {status === "authenticated" ? (
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
              <img src={session?.user?.image || "/assets/avatar/image.png"} className="rounded-full" />
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-4 shadow-lg">
            <div className="flex flex-row gap-3 mb-4">
              <img src={session?.user?.image || "/assets/avatar/image.png"} className="rounded-full w-12 h-12 aspect-square" />
              <div className="flex flex-col">
                <span className="text-lg">{session?.user?.name || "..."}</span>
                <span className="text-xs">{session?.user?.email || "..."}</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white">Login</Button>
            </DialogTrigger>
            <DialogContent className="w-96 h-72 flex flex-col justify-center gap-2">
              <Button onClick={() => { signIn("google", { callbackUrl: '/dashboard' }) }} className="text-lg flex gap-4 p-4 rounded-lg" size={"lg"} variant="outline">
                <img src="/assets/login/google.png" className="w-6" />
                Log in with Google
              </Button>
              <Button onClick={() => { signIn("github", { callbackUrl: '/dashboard' }) }} className="text-lg flex gap-4 p-4 rounded-lg" size={"lg"} variant="outline">
                <img src="/assets/login/github.png" className="w-6" />
                Log in with Github
              </Button>
              <Button onClick={() => { signIn("github", { callbackUrl: '/dashboard' }) }} className="text-lg flex gap-4 p-4 rounded-lg" size={"lg"} variant="outline">
                <img src="/assets/login/github.png" className="w-6" />
                Log in with Faceboook
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="overflow-x-hidden" style={{ marginTop: marginTop }} suppressHydrationWarning >
        {children}
      </div>
    </>
  );
}
