import { Router } from "express";
import {
  signUpUser,
  signInUser,
  signOutUser
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.route("/sign-up").post(signUpUser);
authRouter.route("/sign-in").post(signInUser);
authRouter.route("/sign-out").post(signOutUser);


export default authRouter;
