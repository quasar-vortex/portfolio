import { Router } from "express";
import { tagController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";

/*
POST   /tags           Create a new tag (authenticated users)
GET    /tags           Get all tags (public)
GET    /tags/:tagId    Get a tag by ID (public)
DELETE /tags/:tagId    Delete a tag (admin only)
*/

const tagRouter = Router();

// Public Routes
tagRouter.get("/tags", tagController.getAllTagsHandler);
tagRouter.get("/tags/:tagId", tagController.getTagByIdHandler);

// Authenticated User Routes
tagRouter.post("/tags", authMiddleware, tagController.createTagHandler);

// Admin Routes
tagRouter.delete(
  "/tags/:tagId",
  authMiddleware,
  roleMiddleware("ADMIN"),
  tagController.deleteTagHandler
);

export default tagRouter;
