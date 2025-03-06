import { Router } from "express";
import { authController } from "../controllers";
import { validateSchema } from "../middlware";
import { authModels } from "../models";

/*
POST /auth/login User logins in and access token, with http only refresh token and user is returned
POST /auth/register Same as login except it also creates the user first
GET/auth/refresh Refreshes the access token and returns user profile with it
GET /auth/logoff Logs off the user and removes refresh token from database
*/
const authRouter = Router();

authRouter
  .post(
    "/login",
    validateSchema(authModels.loginUserModel),
    authController.loginUserHandler
  )
  .post(
    "/register",
    validateSchema(authModels.registerUserModel),
    authController.registerUserHandler
  )
  .get("/refresh", authController.refreshUserHandler)
  .get("/logoff", authController.logOffUserHandler);

export default authRouter;
