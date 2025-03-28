import { Router } from "express";
import { authMiddleware, roleMiddleware, validateSchema } from "../middleware";
import { postController } from "../controllers";
import { postModels } from "../models";

/*
POST / Create new post (author)
GET  /:slug Get post details (public)
GET /:postId Get post details (author, admin)
PUT /:postId Update post details (author)
PUT /:postId/publish Update post publish status (admin, author)
PUT /:postId/status Update post feature status (admin)
GET / Get many posts and search them (public)
DELETE /:postId Delete post (author, admin)
*/

const postRouter = Router();

postRouter
  .post(
    "/",
    authMiddleware,
    roleMiddleware("AUTHOR"),
    validateSchema(postModels.createNewPostModel),
    postController.createNewPostHandler
  )
  .get("/:slug", postController.getPostBySlugHandler)
  .get("/:postId", authMiddleware, postController.getPostByIdHandler)
  .put(
    "/:postId",
    authMiddleware,
    validateSchema(postModels.updatePostModel),
    postController.updatePostByIdHandler
  )
  .put(
    "/:postId/publish",
    authMiddleware,
    validateSchema(postModels.updatePostPublishModel),
    postController.setPostPublishStatusHandler
  )
  .put(
    "/:postId/featured",
    authMiddleware,
    roleMiddleware("ADMIN"),
    validateSchema(postModels.updatePostFeatureModel),
    postController.setPostFeaturedStatusHandler
  )
  .get("/", postController.getManyPostsHandler)
  .delete("/:postId", authMiddleware, postController.deletePostByIdHandler);

export default postRouter;
