import React, { useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import { useParams } from "react-router-dom";

const WorkspaceDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const { workspaceId } = useParams();

  useEffect(() => {
    workspaceId && fetchDocuments();
  }, [workspaceId]);

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/document/get-all",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workspaceId }),
        }
      );
      const data = await response.json();
      console.log("Fetch Doc", data);
      setDocuments(data.result);
    } catch (error) {
      console.log("FETCH DOCUMENTS frontent FAILED: ", error);
    }
  };

  return (
    <div className="flex">
      <div className="hidden md:block fixed top-0 left-0 md:w-72">
        <SideNav
          documents={documents}
          setDocuments={setDocuments}
          workspaceId={workspaceId}
        />
      </div>
      <div></div>
    </div>
  );
};

export default WorkspaceDashboard;
