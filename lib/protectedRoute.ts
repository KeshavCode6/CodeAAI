import { useSession } from "next-auth/react";
import { Red_Rose } from "next/font/google";

export function useProtectedRoute(){
    if(typeof window == "undefined") return {};
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            location.href="/"
        },
    });
    return {session, status};
}

