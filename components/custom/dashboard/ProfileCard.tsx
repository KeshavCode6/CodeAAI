import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function EditProfileDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="absolute bottom-0 right-0 m-2" asChild>
        <Button variant="outline">
          <EditIcon />
          <span className="ml-3">
            Edit Profile
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-96">

        <AlertDialogHeader>
          <AlertDialogTitle>
            Edit profile
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Label>
          Name
        </Label>
        <Input defaultValue="Keshav Shah" />

        <Label>
          Picture
        </Label>
        <Input type="file" />

        <AlertDialogFooter>

          <AlertDialogCancel>
            <Button variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction>
            <Button>
              Save
            </Button>
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  )
}

interface ProfileProps {
  name: string,
  points: string,
  ranking: string,
  avatar: string
}
export default function ProfileCard({ name, avatar, points, ranking }: ProfileProps) {

  return (
    <Card className="flex relative animate-flyTopLeft">
      <div className="mt-10 ml-10 w-[30rem]">
        <Avatar className="flex flex-row gap-7">
          <AvatarImage src={avatar} className="rounded-full w-36 h-36" />
          <div className="flex flex-col justify-start mt-7 gap-3">
            <span className="text-2xl">Welcome back, {name}!</span>
            <span className="text-lg mt-[-12px] text-gray-300">{points} points</span>
            <span className="text-md mt-[-7px] text-gray-400">{ranking}</span>
          </div>
        </Avatar>
      </div>
      <EditProfileDialog />
    </Card>
  )

}