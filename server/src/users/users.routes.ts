import { Router } from "express";
import { valMiddleware } from "../middleware/validation.middleware";
import { updateUserModel, updateUserRole } from "./users.models";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

import * as usersController from "./users.controller";
export const usersRouter = Router();

usersRouter
  .put(
    "/:userId/role",
    authMiddleware,
    roleMiddleware("ADMIN"),
    valMiddleware(updateUserRole),
    usersController.toggleUserRoleHandler
  )
  .put(
    "/:userId",
    authMiddleware,
    valMiddleware(updateUserModel),
    usersController.updateUserProfileHandler
  )

  .get("/:userId", usersController.getUserByIdHandler)
  .get("/:userId/uploads", authMiddleware, usersController.getUploadsByUserId)
  .get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    usersController.getManyUsersHandler
  )
  .delete("/:userId", usersController.deleteUserByIdHandler);
