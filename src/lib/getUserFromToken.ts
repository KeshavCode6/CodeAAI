import { decode } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getUserFromToken(cookies:any) {
    try {
      //@ts-ignore
        let sessionToken = cookies["_parsed"].get("next-auth.session-token").value; // Access session token correctly
        const secret = process.env.NEXT_AUTH_SECRET;

        if (!secret) {
            throw new Error('Internal Error: Missing auth secret');
        }

        const decoded = await decode({ token: sessionToken, secret });
        if (!decoded) {
            throw new Error('Invalid token or user data');
        }

        return decoded;
    } catch (error) {
        console.error("Error decoding token");
        throw error; // Propagate error for handling in POST function
    }
}

export async function getAdminUser(cookies:any) {
    const adminEmails = ["keshavrshah@gmail.com"]
    try {
      //@ts-ignore
        let sessionToken = cookies["_parsed"].get("next-auth.session-token").value; // Access session token correctly
        const secret = process.env.NEXT_AUTH_SECRET;

        if (!secret) {
            throw new Error('Internal Error: Missing auth secret');
        }

        const decoded = await decode({ token: sessionToken, secret });
        if (!decoded) {
            throw new Error('Invalid token or user data');
        }

        if(adminEmails.includes(decoded?.email || "")){
            return decoded;
        }

        return false;
    } catch (error) {
        console.error("Error decoding token");
        throw error; // Propagate error for handling in POST function
    }
}
