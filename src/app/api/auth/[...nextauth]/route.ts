import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { prismaClient } from '@/lib/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter"; 

// getting env vars
const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
} = process.env;

// making sure they are all defined
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('[api/auth/[...nextauth]/route.ts] GOOGLE OR GITHUB CLIENT ID OR SECRET is not defined');
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'    // using JWT over session
    },
    adapter: PrismaAdapter(prismaClient),
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        "signIn": "/login"    // setting up custom login page
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET
        })
    ]
};

// exporting route handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
