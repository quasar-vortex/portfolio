import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlware";
import fileUtils from "../utils/fileUtils";
import fileController from "../controllers/fileController";
/*
POST / Uploads a new file
GET /:fileId Gets a file by id
GET / Gets many files, requires admin role
DELETE /:fileId Deletes a file by ID
*/

const filesRouter = Router();

filesRouter
  .post(
    "/",
    authMiddleware,
    fileUtils.upload.single("file"),
    fileController.uploadFileHandler
  )
  .get("/:fileId", fileController.getFileByIdHandler)
  .delete("/:fileId", authMiddleware, fileController.deleteFileByIdHandler)
  .get(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    fileController.getManyFilesHandler
  );

export default filesRouter;
