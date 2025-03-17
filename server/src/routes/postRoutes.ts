import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middleware";
import { tagController } from "../controllers";

/*
POST / Create new post (author)
GET  /:slug Get post details (public)
GET /:postId Get post details (author, admin)
PUT /:postId Update post details (author)
PUT /:postId/status Update post publish status (admin, author)
GET / Get many posts and search them (public)
DELETE /:postId Delete post (author, admin)
*/

const postRouter = Router();

postRouter
  .post("/")
  .get("/:slug")
  .get("/:postId")
  .put("/:postId")
  .put("/:postId/status")
  .get("/")
  .delete("/:postId");

export default postRouter;
