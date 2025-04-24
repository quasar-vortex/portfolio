import { Router } from "express";
import * as postController from "./posts.controller";
export const postsRouter = Router();

postsRouter
  .post("/", postController.createPostHandler)
  .patch("/:postId", postController.updatePostHandler)
  .get("/", postController.getManyPostsHandler)
  .get("/:postId", postController.getPostByIdHandler)
  .get("/slug/:slug", postController.getPostBySlugHandler)
  .delete("/:postId", postController.deletePostHandler)
  .put("/:postId/feature", postController.updatePostHandler);
