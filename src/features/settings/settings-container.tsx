import { axiosInstance } from "@/utils/axios.api";
import { useEffect, useState } from "react";
import { useKeycloak } from "../keycloak/useKeycloak";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserModel } from "./models/user.models";
import PlaceholderImage from "../../assets/placeholder-profile.jpg";
import { z } from "zod";

const formSchema = z.object({
  bio: z.string(),
  imageData: z.string(),
});

export default function SettingsContainer() {
  const { keycloak } = useKeycloak();
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    axiosInstance
      .get("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [keycloak.token]);
  return (
    <div className="container flex flex-col items-center gap-6">
      <div className="avatar flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            src={user?.imageData ? user.imageData : PlaceholderImage}
          />
          <AvatarFallback>WIU</AvatarFallback>
        </Avatar>
        <div className="grid w-full items-center gap-1.5">
          <Input id="picture" type="file" />
        </div>
      </div>
      <div className="user-info flex flex-col items-center w-full gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled
            id="email"
            type="email"
            placeholder="Email"
            defaultValue={user?.email}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            disabled
            id="username"
            type="text"
            placeholder="Email"
            defaultValue={user?.username}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="biography">Biography</Label>
          <Textarea
            id="biography"
            placeholder="Type your message here."
            defaultValue={user?.bio}
          />
        </div>
      </div>
      <div className="flex flex-col w-full items-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}
