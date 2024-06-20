import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function protectedRoute(){
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login");
        },
    });
    return {session, status};
}