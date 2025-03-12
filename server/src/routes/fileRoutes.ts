import { Router } from "express";
import { filesController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";
import fileUtils from "../utils/fileUtils";

/*
POST   /uploads          Upload a new file (authenticated users)
GET    /uploads/:fileId  Get file metadata by file ID (public)
GET    /uploads          Get all files (admin only)
GET    /uploads/user/:userId  Get all files uploaded by a specific user (authenticated)
DELETE /uploads/:fileId  Delete a file (admin)
DELETE /uploads/user/:userId/:fileId Delets users file
*/
const fileRouter = Router();

fileRouter
  .post(
    "/uploads",
    authMiddleware,
    fileUtils.upload.single("file"),
    filesController.uploadFileHandler
  )
  .get("/uploads/:fileId", filesController.getFileByIdHandler)
  .get(
    "/uploads",
    authMiddleware,
    roleMiddleware("ADMIN"),
    filesController.getManyFilesHandler
  )
  .get(
    "/uploads/user/:userId",
    authMiddleware,
    filesController.getUsersFilesHandler
  )
  .delete(
    "/uploads/users/:userId/:fileId",
    authMiddleware,
    filesController.deleteFileByIdHandler
  )
  .delete(
    "/uploads/:fileId",
    authMiddleware,
    filesController.deleteFileAdminHandler
  );

export default fileRouter;
