import { Router } from "express";
import { userController } from "../controllers";
import { validateSchema } from "../middlware/validationMiddleware";
import { userModels } from "../models";
import { authMiddleware } from "../middlware/authMiddleware";

const userRouter = Router();

userRouter
  .patch(
    "/me",
    authMiddleware,
    validateSchema(userModels.updateUserModel),
    userController.updateSignedInUserProfileHandler
  )
  .get("/:userId")
  .get("/")
  .get("/me");

export default userRouter;
