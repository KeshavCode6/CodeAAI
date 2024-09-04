"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GalleryThumbnailsIcon,
  Home,
  Package2,
  PlayIcon,
  ListOrdered,
  CogIcon,
  Menu,
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { signIn, signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ThreeDots } from "./Threedots";
import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { getUserData, UserStats } from "@/lib/getUserData";


interface NavbarProps {
  path?: string;
  marginTop?: string;
  children?: React.ReactNode;
}

export function UserDropdown({ session }: { session: any }) {
  const [userData, setUserData] = useState<UserStats | null>(null);

  useEffect(()=>{
      getUserData().then(data=>{
          setUserData(data);
      })
  })
  
  return (
    <div className="absolute top-3 right-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
            <img src={userData?.image|| "/assets/avatar/image.png"} className="rounded-full" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit p-4 shadow-lg">
          <DropdownMenuItem onClick={() => signOut()}>Sign out</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


interface NavbarProps {
  path?: string; // Active path
  loginOpen?:boolean;
}
export function Navbar({ children, path, marginTop = "4rem", loginOpen=false }: NavbarProps) {
  const { data: session, status } = useSession();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  const [isLoginOpen, setLoginOpen] = useState(loginOpen)

  // Fixing hydration errors
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    ); // Customize your loading state
  }

  const links = [
    { route: "/dashboard", title: "Dashboard" },
    { route: "#about", title: "About" },
    { route: "#contact", title: "Contact" },
    { route: "#faqs", title: "FAQs" },
  ];

  const handleNavigation = (route: string) => {
    if (route.startsWith("#")) {
      // Scroll to section
      const element = document.querySelector(route);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to route
      router.push(route);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-between px-16 items-center bg-slate-950/[.85] backdrop-blur h-16 shadow-sm shadow-slate-900 z-[1]" suppressHydrationWarning>
        <div className="flex items-center">
          <a className="flex gap-1 mr-9" href="/">
            <GalleryThumbnailsIcon />
            Code AAI
          </a>
          <NavigationMenu>
            {links.map((value, index) => {
              let eClass = navigationMenuTriggerStyle();
              if (path === value.route) {
                eClass += " underline underline-offset-4";
              }
              return (
                <div
                  key={index}
                  className={eClass}
                  onClick={() => handleNavigation(value.route)}
                >
                  {value.title}
                </div>
              );
            })}
          </NavigationMenu>
        </div>
        {status === "authenticated" ? (
          <UserDropdown session={session} />
        ) : (
          <Dialog open={isLoginOpen} onOpenChange={setLoginOpen}>
            <DialogTrigger>
              <Button className="text-white" onClick={()=>{setLoginOpen(true)}}>Login</Button>
            </DialogTrigger>
            <DialogContent className="w-96 h-72 flex flex-col justify-center gap-2">
              <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="text-lg flex gap-4 p-4 rounded-lg" size="lg" variant="outline">
                <img src="/assets/login/google.png" className="w-6" />
                Log in with Google
              </Button>
              <Button onClick={() => signIn("github", { callbackUrl: '/dashboard' })} className="text-lg flex gap-4 p-4 rounded-lg" size="lg" variant="outline">
                <img src="/assets/login/github.png" className="w-6" />
                Log in with Github
              </Button>
              <p className="text-xs absolute left-24 right-24 bottom-5 text-center text-gray-500">As of now, we don't allow email and password login</p>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="overflow-x-hidden" style={{ marginTop }} suppressHydrationWarning>
        {children}
      </div>
    </>
  );
}

interface SidebarProps {
  path?: string; // Active path
}

export function Sidebar({ children, path }: React.PropsWithChildren<SidebarProps>) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { href: "/play", label: "Play", icon: <PlayIcon className="h-5 w-5" /> },
    { href: "/leaderboard", label: "Leaderboard", icon: <ListOrdered className="h-5 w-5" /> },
    { href: "/settings", label: "Settings", icon: <CogIcon className="h-5 w-5" /> }
  ];

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <ThreeDots />
      </div>
    ); // Customize your loading state
  }

  if (status !== "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <Link
            href="/"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Code AAI</span>
          </Link>

          {links.map((link) => {
            const isActive = path === link.href; // Check if the current path matches the link

            return (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-4 px-2.5 ${path === link.href ? "text-foreground" : "text-muted-foreground"
                      }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="relative ml-auto flex-1 md:grow-0" />
          <UserDropdown session={session} />
        </header>
        <div className="flex flex-col">
          <main className="mt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
