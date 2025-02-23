import { Workspace } from "../models/workspace.model.js";

const authenticateWorkspaceId = async (req, res, next) => {
  const { workspaceId } = req.body;
  const result = await Workspace.findById(workspaceId);
  if (!result) {
    return res
      .status(400)
      .json({ success: false, msg: "Invalid Workspace ID" });
  }
  req.body.workspaceId = result._id;
  next();

  // res.status(500).json({ success: false, msg: "Internal server error" });
};

export { authenticateWorkspaceId };
