import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

function EditProfileDialog(props: any) {

  const { name, leaderboard } = props;

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null);
  const [resetAvatar, setResetAvatar] = useState(false);

  const onAvatarChange = (event: any) => {

    const file = event.target.files[0];

    if (file) {
      setUpdatedAvatar(file);
    }
    
  }

  const updateUserProfile = () => {
    const formData = new FormData();
    formData.append("name", updatedName);
    if (updatedAvatar) {
      formData.append("avatar", updatedAvatar);
    }

    axios.post("/api/updateUserProfile", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log("Success:", response.data);
        // Optionally handle success, e.g., update state or UI
        window.location.reload();  // Reload the page after successful update
      })
      .catch(error => {
        console.error("Error:", error);
        // Handle error, e.g., show error message to user
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute bottom-0 right-0 m-2" asChild>
        <Button variant="outline">
          <EditIcon />
          <span className="ml-3">Edit profile</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit profile</AlertDialogTitle>
        </AlertDialogHeader>

        <Label>Name</Label>
        <Input defaultValue={name} onChange={setUpdatedName} placeholder={name}/>

        <Label>Picture</Label>
        <Input type="file" onChange={onAvatarChange} accept="image/png, image/jpg, image/jpeg"/>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={updateUserProfile}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ProfileProps {
  name: string;
  points: string;
  ranking: string;
  avatar: string;
  status: "authenticated" | "loading";
}

export default function ProfileCard({
  name,
  status,
  avatar = "/assets/default-avatar.jpeg",
  points,
  ranking,
}: ProfileProps) {
  const firstName = name.split(" ")[0];

  return (
    <Card className="flex relative animate-flyTopLeft">
      <div className="w-[34rem] flex flex-row p-5 gap-5">
        {status === "loading" ? (
          <>Processing...</>
        ) : (
          <>
            <img src={avatar} className="w-36 rounded-full h-36" />
            <div className="flex flex-col justify-start mt-7 gap-3">
              <span className="text-2xl">Welcome back, {firstName}!</span>
              <span className="text-lg mt-[-12px] text-gray-300">
                {points} points
              </span>
              <span className="text-md mt-[-7px] text-gray-400">{ranking}</span>
            </div>
          </>
        )}
      </div>
      <EditProfileDialog name={name} />
    </Card>
  );
}
