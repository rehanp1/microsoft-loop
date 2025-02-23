import { Document } from "../models/document.model.js";

const getAllDocument = async (req, res) => {
  try {
    const { workspaceId } = req.body;

    const result = await Document.find({
      workspaceId,
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

const createDocument = async (req, res) => {
  try {
    const { workspaceId } = req.body;

    const result = await Document.create({
      workspaceId,
    });
    res.status(200).json({
      success: true,
      msg: "Document created successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const deleteDocument = async (req, res) => {
  try {
    const { workspaceId, docId } = req.body;

    await Document.deleteOne({
      workspaceId,
      _id: docId,
    });
    res.status(200).json({
      success: true,
      msg: "OK",
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export { getAllDocument, createDocument, deleteDocument };
