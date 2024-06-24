"use client"
import Navigation from "@/components/custom/navigation"
import { GalleryThumbnailsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import { signIn } from "next-auth/react"

// Login page
export default function Login() {
    return (
        <Navigation>
            {/*Centering card*/}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center w-[40rem]">
                {/*Login Cards*/}
                <Card className="w-full p-8">
                    {/*Logo*/}
                    <CardHeader>
                        <div className="flex flex-row self-center gap-3 mb-10">
                            <GalleryThumbnailsIcon size={50} />
                            <span className="text-5xl">Code AAI</span>
                        </div>
                    </CardHeader>
                    {/*Oath Buttons*/}
                    <CardContent className="grid gap-4 flex-col">
                        <div className="flex flex-col items-center gap-3">
                            <Button onClick={() => { signIn("google", { callbackUrl: '/dashboard' }) }} className="text-lg flex gap-4 p-4 rounded-lg" size={"lg"} variant="outline">
                                <img src="/assets/login/google.png" className="w-6" />
                                Log in with Google
                            </Button>
                            <Button onClick={() => { signIn("github", { callbackUrl: '/dashboard' }) }} className="text-lg flex gap-4 p-4 rounded-lg" size={"lg"} variant="outline">
                                <img src="/assets/login/github.png" className="w-6" />
                                Log in with Github
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Navigation>

    )

}