import { Router } from "express";
import {
  signUpUser,
  signInUser,
  testToken,
} from "../controllers/auth.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.route("/sign-up").post(signUpUser);
authRouter.route("/sign-in").post(signInUser);
authRouter.route("/test-token").post(authenticateToken, testToken);

export default authRouter;
