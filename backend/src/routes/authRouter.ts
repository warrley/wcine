import express from "express";
import * as authController from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signin", authController.signin);
authRouter.post("/signup", authController.signup);

export { authRouter };