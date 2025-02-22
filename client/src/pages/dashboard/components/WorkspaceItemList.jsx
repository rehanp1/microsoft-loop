import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash } from "lucide-react";

const WorkspaceItemList = ({ workSpaceList, setWorkSpaceList }) => {
  const handleDeleteWorkspace = async (_id) => {
    try{
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/delete-workspace",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workspaceId: _id }),
        }
      );
      const data = await response.json();
      setWorkSpaceList((prevData) => [
        ...prevData.filter((item) => item._id !== _id),
      ]);
      console.log(data);
    }catch(error){
      console.log("WORKSPACE DELETE frontent FAILED: ", error);
    }
  };
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  my-8">
      {workSpaceList.map((workspace) => (
        <div
          key={workspace._id}
          className="max-w-sm border rounded-xl overflow-hidden shadow-lg  cursor-pointer"
        >
          <img
            src={workspace.coverImage}
            alt=""
            className="w-full h-40 object-cover"
          />
          <section className="flex gap-2 p-4 items-center justify-between">
            <h3 className="font-medium text-sm text-slate-800">
              <span className="mr-2">{workspace.emoji}</span>
              {workspace.name.length >= 22
                ? workspace.name.substring(0, 20) + " ..."
                : workspace.name}
            </h3>
            <DropdownMenu className="justify-end">
              <DropdownMenuTrigger>
                <MoreVertical size={18} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => handleDeleteWorkspace(workspace._id)}
                >
                  <Trash /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </div>
      ))}
    </div>
  );
};

export default WorkspaceItemList;
