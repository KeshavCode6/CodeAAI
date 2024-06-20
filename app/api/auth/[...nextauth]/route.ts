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

if (!GOOGLE_CLIENT_ID) {
    throw new Error('[NextAuth] GOOGLE_CLIENT_ID is not defined');
}
if (!GOOGLE_CLIENT_SECRET) {
    throw new Error('[NextAuth] GOOGLE_CLIENT_SECRET is not defined');
}
if (!GITHUB_CLIENT_ID) {
    throw new Error('[NextAuth] GITHUB_CLIENT_ID is not defined');
}
if (!GITHUB_CLIENT_SECRET) {
    throw new Error('[NextAuth] GITHUB_CLIENT_SECRET is not defined');
}

const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
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
        async signIn({ user, account, profile, email, credentials }) {
            await dbConnect();

            if (!profile?.email) {
                throw new Error('Invalid profile');
            }

            try {
                // Create a new user if not exists
                const existingUser = await User.findOne({ id: profile.sub });
                if (!existingUser) {
                    const newUser = new User({
                        name: profile.name,
                        id: 0,
                        challenges: [],
                        points: 0
                    });
                    await newUser.save();
                }

                // Return true or a string to indicate successful sign-in
                return '/dashboard'; // Example: Redirect to dashboard path

            } catch (error) {
                console.error('Error during sign-in:', error);
                throw new Error('Sign-in failed');
            }
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
