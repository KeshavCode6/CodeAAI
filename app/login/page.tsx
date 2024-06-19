"use client"

import Footer from "@/components/custom/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { GalleryThumbnailsIcon } from "lucide-react"

export default function Login() {

    return (

        <div>

            <div className="h-screen flex justify-center flex-col">

                <Card className="self-center p-3 text-center">
                    <div className="flex flex-row self-center gap-5 mb-20">
                        <GalleryThumbnailsIcon size={30}/>
                        <span className="text-2xl">Code AAI</span>
                    </div>
                    <CardHeader>
                        <CardTitle>Create an account </CardTitle>
                    </CardHeader>
                    <CardContent className="flex gap-5 flex-col">
                        <div className="flex gap-2 flex-col">
                            <Input placeholder="john.doe@example.com" className="text-md"></Input>
                            <Button className="text-lg flex gap-2">
                                Sign up with Email
                            </Button>
                        </div>
                        <hr />
                        <div className="flex gap-2 flex-col">
                            <Button className="text-lg flex gap-2" variant="outline">
                                <img src="/assets/login/google.png" className="w-6"/>
                                <span>Google</span>
                            </Button>
                            <Button className="text-lg flex gap-2" variant="outline">
                                <img src="/assets/login/github.png" className="w-6"/>
                                <span>GitHub</span>
                            </Button>
                        </div>
                    </CardContent>
                    
                </Card>
            </div>

            <Footer/>
        </div>

    )

}