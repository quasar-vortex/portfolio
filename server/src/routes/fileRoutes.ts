import { Router } from "express";
import { filesController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";
import fileUtils from "../utils/fileUtils";

/*
POST   /uploads          Upload a new file (authenticated users)
GET    /uploads/:fileId  Get file metadata by file ID (public)
GET    /uploads          Get all files (admin only)
GET    /uploads/user/me  Get all files uploaded by the authenticated user
DELETE /uploads/:fileId  Delete a file (only owner or admin)
*/

const fileRouter = Router();

// Upload file
fileRouter.post(
  "/uploads",
  authMiddleware,
  fileUtils.upload.single("file"),
  filesController.uploadFileHandler
);

// Public: Get file metadata by file ID
fileRouter.get("/uploads/:fileId", filesController.getFileByIdHandler);

// Get all files (admin only)
fileRouter.get(
  "/uploads",
  authMiddleware,
  roleMiddleware("ADMIN"),
  filesController.getManyFilesHandler
);

// Get authenticated user's files
fileRouter.get(
  "/uploads/user/me",
  authMiddleware,
  filesController.getUsersFilesHandler
);

// Delete a file (only owner or admin)
fileRouter.delete(
  "/uploads/:fileId",
  authMiddleware,
  filesController.deleteFileByIdHandler
);

// Admin-only file deletion
fileRouter.delete(
  "/uploads/admin/:fileId",
  authMiddleware,
  roleMiddleware("ADMIN"),
  filesController.deleteFileAdminHandler
);

export default fileRouter;
