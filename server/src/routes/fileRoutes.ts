import { Router } from "express";
import { authMiddleware } from "../middleware";

import fileUtils from "../utils/fileUtils";
import fileController from "../controllers/fileController";

/*
PUT / Upload a new file (authenticated)
GET /:fileId Download a file (public)
DELETE /:fileId Delete a file (owner, admin)
*/

const fileRouter = Router();

fileRouter
  .put(
    "/",
    authMiddleware,
    fileUtils.upload.single("file"),
    fileController.uploadFileHandler
  )
  .get("/:fileId", authMiddleware, fileController.getFileByIdHandler)
  .delete("/:fileId", authMiddleware, fileController.deleteFileByIdHandler);

export default fileRouter;
