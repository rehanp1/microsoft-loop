import React from "react";
import { Input } from "@/components/ui/input";
import { Play } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "@/components/Logo";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  return (
    <div className="grid place-items-center min-h-screen bg-[url(microsoft-bg.avif)] bg-no-repeat bg-cover bg-center">
      {/* Sign in form */}
      <div className="p-4 md:p-6 shadow-md shadow-gray-400 w-[90%] sm:max-w-sm rounded-lg overflow-hidden bg-white">
        <div className="flex justify-center mb-4">
          <Logo />
        </div>
        <div className="text-center">
          <h3 className="text-lg text-slate-800 font-medium mb-1">
            Sign in to Microsoft Loop
          </h3>
          <p className="text-sm text-slate-500">
            Welcome back! Please sign in to continue
          </p>

          <form className="mt-4 space-y-3">
            <div className="text-left">
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                className="text-sm border-gray-400"
              />
            </div>
            <div className="text-left">
              <Label htmlFor="password">Password</Label>
              <Input
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
            Don't have an account?{" "}
            <NavLink
              to="/sign-up"
              className="text-slate-800 font-medium hover:underline"
            >
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
