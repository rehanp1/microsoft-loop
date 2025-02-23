import { Router } from "express";
import {
  createWorkspace,
  getAllWorkspaces,
  deleteWorkspace,
} from "../controllers/workspace.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const workspaceRouter = Router();

workspaceRouter
  .route("/create")
  .post(authenticateToken, createWorkspace);
workspaceRouter
  .route("/get-all")
  .post(authenticateToken, getAllWorkspaces);
workspaceRouter
  .route("/delete")
  .post(authenticateToken, deleteWorkspace);

export default workspaceRouter;
