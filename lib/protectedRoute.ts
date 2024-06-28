import { useSession } from "next-auth/react";

export function useProtectedRoute(){
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            location.href="/"
        },
    });
    return {session, status};
}

