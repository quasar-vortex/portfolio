import { Router } from "express";
import * as postController from "./posts.controller";
import { valMiddleware } from "../middleware/validation.middleware";
import {
  createPostModel,
  searchPostsModel,
  updatePostModel,
} from "./post.models";
import {
  authMiddleware,
  optionalAuthMiddleware,
  roleMiddleware,
} from "../middleware/auth.middleware";
export const postsRouter = Router();

postsRouter
  .post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    valMiddleware(createPostModel),
    postController.createPostHandler
  )
  .patch(
    "/:postId/feature",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.togglePostFeatured
  )
  .patch(
    "/:postId/publish",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.togglePostPublished
  )
  .put(
    "/:postId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    valMiddleware(updatePostModel),
    postController.updatePostHandler
  )
  .get(
    "/",
    valMiddleware(searchPostsModel),
    optionalAuthMiddleware,
    postController.getManyPostsHandler
  )
  .get("/:postId", authMiddleware, postController.getPostByIdHandler)
  .get(
    "/slug/:slug",
    optionalAuthMiddleware,
    postController.getPostBySlugHandler
  )
  .delete(
    "/:postId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.deletePostHandler
  );
