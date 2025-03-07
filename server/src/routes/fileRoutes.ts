import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middlware";

/*
POST / Uploads a new file
GET /:fileId Gets a file by id
GET / Gets many files, requires admin role
DELETE /:fileId Deletes a file by ID
*/

const filesRouter = Router();

filesRouter
  .post("/", authMiddleware)
  .get("/:fileId")
  .delete("/:fileId", authMiddleware)
  .get("/", authMiddleware, roleMiddleware("ADMIN"));

export default filesRouter;
