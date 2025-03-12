import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";

/*
POST   /             Creates a new post
GET    /:slug        Gets a post by its slug (public)
GET    /             Gets many posts (public view, can search)
GET    /me           Gets the signed-in user's posts
GET    /admin        Admin gets all users' posts and can search
DELETE /:postId      Deletes a post by its ID (user or admin)
PUT    /:postId      Updates a post (only owner or admin)
*/

const postRouter = Router();

postRouter
  .post("/", authMiddleware, postController.createNewPostHandler)
  .get("/:slug", postController.getPostBySlugHandler)
  .get("/", postController.getManyPostsHandler)
  .get("/me", authMiddleware, postController.getSignedInPostsHandler)
  .get(
    "/admin",
    authMiddleware,
    roleMiddleware("ADMIN"),
    postController.getAdminPostsHandler
  ) // New admin route
  .put("/:postId", authMiddleware, postController.editPostHandler) // Ensures only author/admin can edit
  .delete("/:postId", authMiddleware, postController.deletePostByIdHandler);

export default postRouter;
