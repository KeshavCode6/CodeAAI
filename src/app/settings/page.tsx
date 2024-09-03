"use client"

import { Sidebar } from "@/components/Navigation";
import { ThreeDots } from "@/components/Threedots";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Settings() {

    const { data: session, status } = useSession();

    const [editedName, setEditedName] = useState<String>("");

    if (status === "loading") {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <ThreeDots />
            </div>
        );
    }

    const editUserSettings = async () => {
        await fetch('/api/editUserSettings', {
            method: "POST",
            body: JSON.stringify({
                name: editedName
            })
        });
    }

    return (
        <Sidebar path="/settings">
            <div
                className='absolute top-0 left-0 md:left-10 right-0 bottom-0 bg-no-repeat bg-cover flex justify-center items-center z-10 '
                style={{ backgroundImage: "url('/assets/b2.svg')" }}
            >
                <Card className="px-8 animate-flyBottom py-8">
                    <CardHeader>
                        <CardTitle>
                            User Settings
                        </CardTitle>
                        <CardDescription>
                            Edit your account and profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-y-4 mt-4">
                            <div className="flex flex-col mb-4">
                                <span className="font-bold">Profile Picture</span>
                                <div className="flex flex-row gap-x-4">
                                    <img src={session?.user?.image || ""} alt="Profile Picture" className="w-16 h-16 rounded-full" />
                                    <Input type="file" className="my-auto w-56" />
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="my-auto font-bold">Name</span>
                                <Input defaultValue={session?.user?.name || ""} className="w-96" onChange={event => setEditedName(event.target.value)} />
                            </div>
                            <Button className="mt-4 text-white">Save</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Sidebar>
    )

}