import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { coverOptions } from "@/lib/config";
import React, { useState } from "react";

const CoverPicker = ({ open, setOpen, setCoverImage }) => {
  const [selectedCoverImage, setSelectedCoverImage] = useState(0);

  const handleUpdateCoverImage = () => {
    setCoverImage(selectedCoverImage);
    setOpen(false);
  };
  return (
    <Dialog open={open}>
      <DialogContent className="w-[90%] sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 h-52 overflow-auto mt-4 p-2">
              {coverOptions.map(({ imageUrl }, idx) => (
                <img
                  key={idx}
                  src={imageUrl}
                  alt="cover-img"
                  className={`w-36 h-24 rounded-lg ${
                    selectedCoverImage === imageUrl &&
                    "outline outline-primary outline-offset-2"
                  }`}
                  onClick={() => setSelectedCoverImage(imageUrl)}
                />
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button type="submit" onClick={handleUpdateCoverImage}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoverPicker;
