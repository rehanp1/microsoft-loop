import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        id: this._id,
        name: this.name,
        email: this.email,
      },
      process.env.VITE_JWT_SECRET_KEY,
      {
        expiresIn: "15d",
      }
    );
  } catch (error) {
    console.log("TOKEN generate FAILED: ", error);
  }
};

export const User = mongoose.model("User", userSchema);
