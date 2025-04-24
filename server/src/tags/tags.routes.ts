import { Router } from "express";
import * as tagsController from "./tags.controller";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";
import { valMiddleware } from "../middleware/validation.middleware";
import { createTagModel, updateTagModel } from "./tags.models";
/*
GET / Get all tags with search by tag name - PUBLIC Access
POST / Create a new tag - ADMIN Access
PUT /:tagId Update a tag name - ADMIN Access
GET /:tagId - PUBLIC Access
GET /name/:tagName PUBLIC Access
DELETE /:tagID - ADMIN Access
*/

export const tagsRouter = Router();

tagsRouter
  .get("/", tagsController.searchTagsHandler)
  .post(
    "/",
    authMiddleware,
    valMiddleware(createTagModel),
    tagsController.createNewTagHandler
  )
  .put(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    valMiddleware(updateTagModel),
    tagsController.updateTagByIdHandler
  )
  .get("/:tagId", tagsController.getTagByIdHandler)
  .get("/name/:tagName", tagsController.getTagByNameHandler)
  .delete(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    tagsController.deleteTagByIdHandler
  );
