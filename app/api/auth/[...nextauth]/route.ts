import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import User from '@/lib/database/schemas/User'; // Import UserModel if defined separately
import dbConnect from '@/lib/database/dbConnect';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
    throw new Error('[api/auth/[...nextauth]/route.ts] GOOGLE OR GITHUB CLIENT ID OR SECRET is not defined');
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        "signIn": "/login"
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
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // add user to token
                token.user = user;
            }
            return Promise.resolve(token);
        },
        session: async ({ session, token }) => {
            // session callback is called whenever a session for that particular user is checked
            // in above function we created token.user=user
            //@ts-ignore
            session.user = token.user;
            // you might return this in new version
            return Promise.resolve(session);
        },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
