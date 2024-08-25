"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  GalleryThumbnailsIcon,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
  Pen,
  Users2,
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


interface NavbarProps {
  path?: string;
  marginTop?: string;
  children?: React.ReactNode;
}

export function UserDropdown({ session }: { session: any }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full w-9 h-9">
          <img src={session?.user?.image || "/assets/avatar/image.png"} className="rounded-full" />
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
  );
}


interface NavbarProps {
  path?: string; // Active path
}
export function Navbar({ children, path, marginTop = "4rem" }: NavbarProps) {
  const { data: session, status } = useSession();
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

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
          <div className="flex gap-1 mr-9">
            <GalleryThumbnailsIcon />
            Code AAI
          </div>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-white">Login</Button>
            </DialogTrigger>
            <DialogContent className="w-96 h-72 flex flex-col justify-center gap-2">
              <Button onClick={() => signIn("google", {callbackUrl:"/dashboard"})} className="text-lg flex gap-4 p-4 rounded-lg" size="lg" variant="outline">
                <img src="/assets/login/google.png" className="w-6" />
                Log in with Google
              </Button>
              <Button onClick={() => signIn("github", { callbackUrl: '/dashboard' })} className="text-lg flex gap-4 p-4 rounded-lg" size="lg" variant="outline">
                <img src="/assets/login/github.png" className="w-6" />
                Log in with Github
              </Button>
              <Button onClick={() => signIn("facebook", { callbackUrl: '/dashboard' })} className="text-lg flex gap-4 p-4 rounded-lg" size="lg" variant="outline">
                <img src="/assets/login/facebook.png" className="w-6" />
                Log in with Facebook
              </Button>
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
    { href: "/create", label: "Create", icon: <Pen className="h-5 w-5" /> },
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
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
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
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${path === "/settings"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </nav>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-16">

        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
