import { Router } from "express";
import { userController } from "../controllers";
import { validateSchema, authMiddleware, roleMiddleware } from "../middlware";
import { userModels } from "../models";

/*
PATCH /me/ Updates the signed in user's profile
GET /:userId Gets a user by their id
GET / Gets may users and requires admin role
GET /me Gets the signed in user's profile
DELETE /me Deletes the signed in user's profile
*/

const userRouter = Router();

userRouter
  .patch(
    "/me",
    authMiddleware,
    validateSchema(userModels.updateUserModel),
    userController.updateSignedInUserProfileHandler
  )
  .get("/:userId", authMiddleware, userController.getUserByIdHandler)
  .get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    userController.getManyUsersHandler
  )
  .get("/me", authMiddleware, userController.getSignedInUserProfile)
  .delete("/me", authMiddleware, userController.deleteSignedInUserHandler);

export default userRouter;
