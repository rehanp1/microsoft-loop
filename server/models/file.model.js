import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema(
  {
    name: String,
    coverImage: String,
    emoji: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", fileSchema);
