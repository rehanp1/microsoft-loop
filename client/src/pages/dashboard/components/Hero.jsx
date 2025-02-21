import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AlignLeft, LayoutGrid, Plus } from "lucide-react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Hero = () => {
  const [workSpaceList, setWorkSpaceList] = useState([]);
  const { user } = useAuth();
  return (
    <main className="max-w-6xl mx-auto mt-12 px-4 xl:px-0">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Hello, {user?.name}</h1>
        <NavLink to="/create-workspace">
          <Button size="icon">
            <Plus />
          </Button>
        </NavLink>
      </div>

      <div className="flex justify-between items-center mt-10">
        <p className="text-primary text-sm">Worskspaces</p>
        <div className="flex gap-1">
          <Button size="icon" variant="secondary">
            <LayoutGrid />
          </Button>
          <Button size="icon" variant="secondary">
            <AlignLeft />
          </Button>
        </div>
      </div>

      {workSpaceList.length === 0 ? (
        <div className="flex flex-col items-center mt-10">
          <img src="/workspace.png" alt="workspace-img" className="w-44" />
          <p className="text-sm font-medium mb-3 text-slate-800">
            Create a new workspace
          </p>
          <NavLink to="/create-workspace">
            <Button>
              <Plus /> New workspace
            </Button>
          </NavLink>
        </div>
      ) : (
        //Rendering of workspaces
        <div></div>
      )}
    </main>
  );
};

export default Hero;
