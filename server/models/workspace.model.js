import mongoose, { Schema } from "mongoose";

const workspaceSchema = new Schema(
  {
    name: String,
    coverImage: String,
    emoji: String,
    owner: String,
  },
  {
    timestamps: true,
  }
);

export const Workspace = mongoose.model("Workspace", workspaceSchema);
