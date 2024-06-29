import { useSession } from "next-auth/react";
import { Red_Rose } from "next/font/google";
import { useRouter } from "next/router";

export function useProtectedRoute(){
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    });
    return {session, status};
}

