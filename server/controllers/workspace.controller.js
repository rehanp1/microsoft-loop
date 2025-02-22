import mongoose from "mongoose";
import { Workspace } from "../models/workspace.model.js";

const createWorkspace = async (req, res) => {
  try {
    const { name, coverImage, emoji } = req.body;
    const { id: verifiedID } = req.user;

    const result = await Workspace.create({
      name,
      coverImage,
      emoji,
      owner: verifiedID,
    });
    res.status(200).json({
      success: true,
      msg: "Workspace created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const getAllWorkspaces = async (req, res) => {
  try {
    const { id: verifiedID } = req.user;

    const result = await Workspace.find({
      owner: verifiedID,
    });
    res.status(200).json({
      success: true,
      msg: "OK",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const deleteWorkspace = async (req, res) => {
  try {
    const { id: verifiedID } = req.user;
    const { workspaceId } = req.body;

    await Workspace.deleteOne({ owner: verifiedID, _id: workspaceId });
    res.status(200).json({
      success: true,
      msg: "OK",
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export { createWorkspace, getAllWorkspaces, deleteWorkspace };
