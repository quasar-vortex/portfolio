import { Router } from "express";
import { authMiddleware, roleMiddleware, validateSchema } from "../middleware";
import { userModels } from "../models";
import { userController } from "../controllers";
import fileUtils from "../utils/fileUtils";

/*
GET /users                Get all users (admin only)
GET /users/:userId        Get User profile by ID (public)
PUT /users/:userId        Update user profile (authenticated)
PUT /users/:userId/avatar Upload avatar file  (authenticated)
GET /users/:userId/posts  Get posts by user (public)
PUT /users/:userId/status Toggle user status to inactive (admin)
DELETE /users/:userId/avatar Delete own avatar (authenticated)
DELETE /users/:userId Delete own account (authenticated, admin)
*/

const userRouter = Router();

userRouter
  .get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validateSchema(userModels.queryUserModel),
    userController.getAllUsersHandler
  )
  .get("/:userId", userController.getUserProfileByIdHandler)
  .put(
    "/:userId",
    authMiddleware,
    validateSchema(userModels.updateUserModel),
    userController.updateUserProfileHandler
  )
  .put(
    "/:userId/avatar",
    authMiddleware,
    fileUtils.upload.single("avatar"),
    userController.uploadAvatarHandler
  )
  .get("/:userId/posts", userController.getPostsByUserId)
  .put(
    "/:userId/status",
    authMiddleware,
    roleMiddleware("ADMIN"),
    userController.toggleUserStatusHandler
  )
  .delete("/:userId/avatar", authMiddleware, userController.deleteAvatarHandler)
  .delete("/:userId", authMiddleware, userController.deleteUserHandler);

export default userRouter;
