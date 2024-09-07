"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/utils/Navigation";
import { LoadingPage } from "@/components/utils/ThreeDots";
import { getMyUserData, UserStats } from "@/lib/getUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [editedUserName, setEditedUserName] = useState<string>(session?.user?.name || "");
    const [editedUserProfilePicture, setEditedUserProfilePicture] = useState<File | null>(null);
    const [myUser, setMyUser] = useState<UserStats | null>(null);

    // sending post request to update settings in backend
    const updateUserProfile = async () => {

        const formData = new FormData();

        formData.append("editedUserName", editedUserName);

        if (editedUserProfilePicture) {
            formData.append("editedUserProfilePicture", editedUserProfilePicture);
        }

        await fetch('/api/updateUserProfile', {
            method: "POST",
            body: formData
        });

        router.refresh();
    };

    // fetching active user's data
    useEffect(() => {
        (async () => {
            const myUserData = await getMyUserData();
            setMyUser(myUserData);
        })();
    }, [])

    // if the user auth status is loading
    if (status === "loading" || !myUser) {
        return <LoadingPage />
    }

    // if the user is not logged in, redirect them to the home page
    if (status === "unauthenticated") {
        router.push('/?loggedIn=false');
        return;
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
                                    <img src={myUser?.image || ""} alt="Profile Picture" className="w-16 h-16 rounded-full object-cover" />
                                    <Input
                                        type="file"
                                        className="my-auto w-56"
                                        onChange={e => setEditedUserProfilePicture(e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <span className="my-auto font-bold">Name</span>
                                <Input
                                    defaultValue={myUser?.name || ""}
                                    className="w-96"
                                    onChange={e => setEditedUserName(e.target.value)}
                                />
                            </div>
                            <Button className="mt-4 text-white" onClick={updateUserProfile}>
                                Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Sidebar>
    );
}
