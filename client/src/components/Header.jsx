import React from "react";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between max-w-7xl mx-auto px-4 py-4">
      <Logo />

      <Button className=" rounded-full" onClick={() => navigate("/sign-up")}>
        Sign Up
      </Button>
    </header>
  );
};

export default Header;
