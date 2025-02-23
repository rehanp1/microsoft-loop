import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { BellIcon, MoreVertical, Plus, Trash } from "lucide-react";
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MAX_DOC_LIMIT = 5;

const SideNav = ({ documents, setDocuments, workspaceId }) => {
  const [activeDocId, setActiveDocId] = useState(0);

  const handleCreateDocument = async () => {
    if (documents?.length === MAX_DOC_LIMIT) {
      alert("Reach the limit");
      return;
    }
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/document/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workspaceId }),
        }
      );
      const data = await response.json();
      console.log("Doc create", data);
      setDocuments((prevData) => [...prevData, data.result]);
    } catch (error) {
      console.log("DOCUMENT CREATE frontent FAILED: ", error);
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/document/delete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workspaceId, docId }),
        }
      );
      const data = await response.json();
      console.log("Doc delete", data);
      setDocuments((prevData) => prevData.filter((item) => item._id !== docId));
    } catch (error) {
      console.log("DOCUMENT CREATE frontent FAILED: ", error);
    }
  };
  return (
    <aside className="h-screen bg-blue-50 w-full p-4 ">
      <div className="flex items-center justify-between">
        <Logo />
        <BellIcon size={22} />
      </div>
      <hr className="my-4 border-1 border-gray-400" />
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm">Workpace Name</h3>
        <Button size="icon" className="h-7 w-7" onClick={handleCreateDocument}>
          <Plus />
        </Button>
      </div>
      {/* Documents Rendering */}
      <div className="mt-4 space-y-2">
        {documents?.map((doc, idx) => (
          <div
            onClick={() => setActiveDocId(idx)}
            key={doc._id}
            className={`flex items-center text-sm p-2 rounded-lg hover:bg-gray-200 cursor-pointer ${
              activeDocId === idx && "bg-white"
            }`}
          >
            <img src="/loopdocument.svg" alt="document-svg" className="mr-2" />
            <h4>{doc.name}</h4>
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical size={15} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => handleDeleteDocument(doc._id)}
                  >
                    <Trash /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 w-64">
        <Progress value={(documents?.length * 100) / MAX_DOC_LIMIT} />
        <h4 className="text-xs mt-1">
          <strong>{documents?.length}</strong> out{" "}
          <strong>{MAX_DOC_LIMIT}</strong> Files used
        </h4>
      </div>
    </aside>
  );
};

export default SideNav;
