"use client"
import Navigation from "@/components/custom/navigation"
import { GalleryThumbnailsIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {signIn} from "next-auth/react"

export default function Login() {

    return (
        <Navigation>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center w-[22vw]">
                <Card className="w-full py-8">
                    <CardHeader>
                        <div className="flex flex-row self-center gap-1 mt-4">
                            <GalleryThumbnailsIcon size={30} />
                            <span className="text-2xl">Code AAI</span>
                        </div>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex flex-col gap-2 items-start">
                        <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="example@example.com" required />
                        </div>
                        <div className="flex flex-col gap-2 items-start">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button className="w-full">Sign in</Button>
                        <p className="my-4 font-semibold text-slate-400">or continue with</p>
                        <div className="flex gap-1">
                            <Button onClick={()=>{signIn("google", { callbackUrl: '/dashboard' })}} className="text-lg flex gap-2 p-1 rounded-full" size={"icon"} variant="outline">
                                <img src="/assets/login/google.png" className="w-6" />
                            </Button>
                            <Button onClick={()=>{signIn("github", { callbackUrl: '/dashboard' })}} className="text-lg flex gap-2 p-1 rounded-full" size={"icon"} variant="outline">
                                <img src="/assets/login/github.png" className="w-6" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </Navigation>

    )

}