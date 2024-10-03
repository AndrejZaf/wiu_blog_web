import { axiosInstance } from "@/utils/axios.api";
import { useEffect } from "react";
import { useKeycloak } from "../keycloak/useKeycloak";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SettingsContainer() {
  const { keycloak } = useKeycloak();

  useEffect(() => {
    axiosInstance
      .get("/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${keycloak.token}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }, [keycloak.token]);
  return (
    <div className="container flex flex-col items-center gap-6 w-6/12">
      <div className="avatar flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
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
            value={"email"}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            disabled
            id="username"
            type="text"
            placeholder="Email"
            value={"username"}
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="biography">Biography</Label>
          <Textarea id="biography" placeholder="Type your message here." />
        </div>
      </div>
      <div className="flex flex-col w-full items-end">
        <Button>Save</Button>
      </div>
    </div>
  );
}
