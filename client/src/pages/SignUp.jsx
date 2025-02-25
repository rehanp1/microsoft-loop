import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SignUp = () => {
  const { handleSetUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respone = await fetch(import.meta.env.VITE_BASE_URL + "/sign-up", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await respone.json();
      handleSetUser(data);
    } catch (error) {
      handleSetUser(null);
      console.log("SIGN UP frontent FAILED: ", error);
    }
  };

  return (
    <div className="grid place-items-center min-h-screen bg-[url(microsoft-bg.avif)] bg-no-repeat bg-cover bg-center">
      {/* Sign up form */}
      <div className="p-4 md:p-6 shadow-md shadow-gray-400 w-[90%] sm:max-w-sm rounded-lg overflow-hidden bg-white">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <div className="text-center">
          <h3 className="text-lg text-slate-800 font-medium mb-1">
            Create your account
          </h3>
          <p className="text-sm text-slate-500">
            Welcome! Please fill in the details to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div className="text-left">
              <Label htmlFor="name">Name</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formData.name}
                type="text"
                id="name"
                className="text-sm border-gray-400"
              />
            </div>
            <div className="text-left">
              <Label htmlFor="email">Email Address</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formData.email}
                type="email"
                id="email"
                className="text-sm border-gray-400"
              />
            </div>
            <div className="text-left">
              <Label htmlFor="password">Create Password</Label>
              <Input
                onChange={(e) => handleChange(e)}
                value={formData.password}
                type="password"
                id="password"
                className="text-sm border-gray-400"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gray-700 hover:bg-gray-800"
            >
              Continue <Play fill="white" />
            </Button>
          </form>

          <p className="text-sm text-slate-500 mt-4">
            Already have an account?{" "}
            <NavLink
              to="/sign-in"
              className="text-slate-800 font-medium hover:underline"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
