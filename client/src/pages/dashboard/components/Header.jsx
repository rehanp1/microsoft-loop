import Logo from "@/components/Logo";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const { handleSetUser } = useAuth();
  const handleLogout = async () => {
    try {
      const respone = await fetch(import.meta.env.VITE_BASE_URL + "/sign-out", {
        method: "POST",
        credentials: "include",
      });
      const data = await respone.json();
      handleSetUser(data);
    } catch (error) {
      console.log("SIGN OUT frontent FAILED: ", error);
    }
  };
  return (
    <header className="flex items-center justify-between p-2 px-4 shadow-md">
      <Logo />

      {/* Organisation option */}
      <div></div>

      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </header>
  );
};

export default Header;
