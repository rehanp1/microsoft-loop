import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";

const EmojiPickerComp = ({ children, setEmoji }) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div className="absolute  z-10">
          <EmojiPicker
            emojiStyle="facebook"
            onEmojiClick={(e) => {
              setEmoji(e.emoji);
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerComp;
