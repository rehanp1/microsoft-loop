import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    name: {
      type: String,
      default: "Untitled Document",
    },
    content: {
      type: String,
      default: "",
    },
    workspaceId: String,
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model("Document", documentSchema);
