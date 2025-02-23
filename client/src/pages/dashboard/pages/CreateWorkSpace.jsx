import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, SmilePlus } from "lucide-react";
import React, { useState } from "react";
import CoverPicker from "../components/CoverPicker";
import EmojiPickerComp from "../components/EmojiPickerComp";
import { useNavigate } from "react-router-dom";

const CreateWorkSpace = () => {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [workspaceName, setWorkSpaceName] = useState("");
  const [emoji, setEmoji] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateWorkspace = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/workspace/create",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: workspaceName,
            coverImage: coverImage,
            emoji: emoji,
          }),
        }
      );
      const data = await response.json();      
      navigate(`/dashboard/${data.result._id}`, {
        replace: true,
      });
    } catch (error) {
      console.log("CREATE-WORKSPACE frontent FAILED: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-screen h-screen grid place-items-center px-4">
      <CoverPicker
        open={open}
        setOpen={setOpen}
        setCoverImage={setCoverImage}
      />

      {/* Create a New Workspace Card */}
      <div className="max-w-xl rounded-lg overflow-hidden shadow-2xl">
        <div
          className="h-40 relative group cursor-pointer "
          onClick={() => setOpen(true)}
        >
          <h2 className="hidden absolute inset-0 group-hover:grid place-items-center font-medium">
            Change Cover
          </h2>
          <img
            src={coverImage}
            alt="default-cover-img"
            className="h-full w-full object-cover group-hover:opacity-40"
          />
        </div>

        <div className="p-10">
          <h3 className="font-medium text-base">Create a new workspace</h3>
          <p className="text-sm text-slate-600 mt-2">
            This is shared space where you can collaborate with your team. You
            can always rename it later.
          </p>

          <section className="flex gap-2 my-6">
            <EmojiPickerComp setEmoji={setEmoji}>
              <Button variant="outline">{emoji ? emoji : <SmilePlus />}</Button>
            </EmojiPickerComp>
            <Input
              type="text"
              placeholder="Workspace Name"
              className="text-sm"
              value={workspaceName}
              onChange={(e) => setWorkSpaceName(e.target.value)}
            />
          </section>

          <section className="flex gap-2 justify-end">
            <Button
              onClick={handleCreateWorkspace}
              disabled={workspaceName.trim().length === 0 || loading}
            >
              Create {loading && <LoaderCircle className="animate-spin" />}
            </Button>
            <Button variant="outline">Cancel</Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkSpace;
