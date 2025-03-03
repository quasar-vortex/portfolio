import { Router } from "express";
import { authController } from "../controllers";
import { validateSchema } from "../middlware/validationMiddleware";
import { authModels } from "../models";

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
