import { Router } from "express";
import { upload } from "../upload";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";

import * as uploadsController from "./uploads.controller";

export const uploadsRouter = Router();

uploadsRouter
  .post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    upload.single("image"),
    uploadsController.uploadFileHandler
  )
  .get("/:fileId", uploadsController.getFileByIdHandler)
  .get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    uploadsController.getManyFilesHandler
  )
  .delete(
    "/:fileId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    uploadsController.deleteFileByIdHandler
  );
