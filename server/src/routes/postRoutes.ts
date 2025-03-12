import { Router } from "express";
import { postController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";

/*
POST   /             Creates a new post (authenticated)
GET    /:slug        Gets a post by its slug (public)
GET    /             Gets many posts (public view, searchable)
GET    /me           Gets the signed-in user's posts (authenticated)
GET    /me/:postId   Gets a specific post by ID (user must be the owner)
PUT    /me/:postId   Updates a post (only owner)
DELETE /me/:postId   Deletes a post (only owner)
GET    /admin        Admin gets all posts (searchable)
PUT    /admin/:postId Updates any post (admin only)
DELETE /admin/:postId Deletes any post (admin only)
*/

const postRouter = Router();

// Public Routes
postRouter.get("/:slug", postController.getPostBySlugHandler);
postRouter.get("/", postController.getManyPostsHandler(false));

// User-Specific Routes (Require Authentication)
postRouter.use(authMiddleware);
postRouter.get("/me", postController.getManyPostsHandler(false));
postRouter.get("/me/:postId", postController.getPostByIdHandler(false));
postRouter.put("/me/:postId", postController.editPostHandler(false));
postRouter.delete("/me/:postId", postController.deletePostByIdHandler(false));

// Admin Routes (Require Admin Privileges)
postRouter.use(roleMiddleware("ADMIN"));
postRouter.get("/admin", postController.getManyPostsHandler(true));
postRouter.put("/admin/:postId", postController.editPostHandler(true));
postRouter.delete("/admin/:postId", postController.deletePostByIdHandler(true));

export default postRouter;
