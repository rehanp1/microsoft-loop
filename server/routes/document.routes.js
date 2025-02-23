import { Router } from "express";
import {
  getAllDocument,
  createDocument,
  deleteDocument,
} from "../controllers/document.controller.js";
import { authenticateWorkspaceId } from "../middlewares/doc.middleware.js";

const documentRouter = Router();

documentRouter.route("/get-all").post(authenticateWorkspaceId, getAllDocument);
documentRouter.route("/create").post(authenticateWorkspaceId, createDocument);
documentRouter.route("/delete").post(authenticateWorkspaceId, deleteDocument);

export default documentRouter;
