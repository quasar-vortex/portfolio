import { Router } from "express";
import { userController, filesController } from "../controllers";
import { validateSchema, authMiddleware, roleMiddleware } from "../middleware";
import { userModels } from "../models";
import fileUtils from "../utils/fileUtils";

/*
GET    /users/:id Get user profile by ID (public)
GET    /users/me Get current authenticated user (private)
PUT    /users/me Update own profile (private)
DELETE /users/me User can set account to inactive then auto delete after x days
PUT    /users/me/avatar Upload or change profile pic (private)
GET    /users Admin can list all users
DELETE /users/:id Admin can delete a user
*/

const userRouter = Router();

userRouter
  .get("/users/:userId", userController.getUserByIdHandler)
  .get("/users/me", authMiddleware, userController.getSignedInUserProfile)
  .put(
    "/users/me",
    authMiddleware,
    validateSchema(userModels.updateUserModel),
    userController.updateSignedInUserProfileHandler
  )
  .put(
    "/users/me/avatar",
    authMiddleware,
    fileUtils.upload.single("avatar"),
    userController.createOrReplaceUserAvatarHandler
  )
  .get("/users", userController.getManyUsersHandler)
  .delete("/users/me", userController.getSignedInUserProfile)
  .delete(
    "/users/:userId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    userController.deleteUserByIdHandler
  );

export default userRouter;
