import { Router } from "express";
import * as postController from "./posts.controller";
import { valMiddleware } from "../middleware/validation.middleware";
import {
  createPostModel,
  searchPostsModel,
  updatePostModel,
} from "./post.models";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";
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
    "/:postId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    valMiddleware(updatePostModel),
    postController.updatePostHandler
  )
  .get("/", valMiddleware(searchPostsModel), postController.getManyPostsHandler)
  .get("/:postId", postController.getPostByIdHandler)
  .get("/slug/:slug", postController.getPostBySlugHandler)
  .delete(
    "/:postId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.deletePostHandler
  )
  .put(
    "/:postId/feature",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.updatePostHandler
  );
