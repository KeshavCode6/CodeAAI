import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/custom/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Code AAI",
  description: "The official website created for the coding club in Alliance Academy for Innovation. Learn to code and stay updated about the club!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
