import { Router } from "express";
import { signUpUser, signInUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/sign-up").post(signUpUser);
authRouter.route("/sign-in").post(signInUser);

export default authRouter;
