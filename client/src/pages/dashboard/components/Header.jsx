import Logo from "@/components/Logo";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

const Header = () => {
  const { handleSetUser, user } = useAuth();
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
    <header className="flex items-center justify-between p-2 px-6 shadow-md">
      <Logo />

      {/* Organisation option */}
      <div></div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuItem className="px-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-xs ml-1">
              <h3 className=" font-medium">{user?.name}</h3>
              <p className="">{user?.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500 px-8 py-2"
            onClick={handleLogout}
          >
            <LogOut className="mr-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
