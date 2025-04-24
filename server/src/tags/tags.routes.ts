import { Router } from "express";
import * as tagsController from "./tags.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";
/*
GET / Get all tags with search by tag name - PUBLIC Access
POST / Create a new tag - ADMIN Access
PUT /:tagId Update a tag name - ADMIN Access
GET /:tagId - PUBLIC Access
DELETE /:tagID - ADMIN Access
*/

export const tagsRouter = Router();

tagsRouter
  .get("/", tagsController.searchTagsHandler)
  .post("/", authMiddleware, tagsController.createNewTagHandler)
  .put(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    tagsController.updateTagByIdHandler
  )
  .get("/:tagId", tagsController.getTagByIdHandler)
  .delete(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    tagsController.deleteTagByIdHandler
  );
