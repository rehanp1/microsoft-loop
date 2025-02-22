import { Router } from "express";
import {
  createWorkspace,
  getAllWorkspaces,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

workspaceRouter
  .route("/create-workspace")
  .post(authenticateToken, createWorkspace);
workspaceRouter
  .route("/get-all-workspaces")
  .post(authenticateToken, getAllWorkspaces);
workspaceRouter
  .route("/delete-workspace")
  .post(authenticateToken, deleteWorkspace);

export default workspaceRouter;
