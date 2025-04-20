import { Router } from "express";
import { valMiddleware } from "../middleware/validation.middleware";
import { loginUserModel, registerUserModel } from "./auth.models";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  loginUserHandler,
  refreshUserHandler,
  registerUserHandler,
  signOutUserHandler,
} from "./auth.controller";

export const authRouter = Router();

authRouter
  .post("/register", valMiddleware(registerUserModel), registerUserHandler)
  .post("/login", valMiddleware(loginUserModel), loginUserHandler)
  .get("/refresh", refreshUserHandler)
  .get("/logoff", authMiddleware, signOutUserHandler);
