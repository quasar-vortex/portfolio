import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middleware";
import { tagController } from "../controllers";

/*
POST / Create new tag (author,admin)
PUT  /:tagId Update tag name (admin)
DELETE /:tagId Delete tag name (admin)
GET /:tagId Get tag by Id (Public)
GET / Get many tags and search (public)
*/

const tagRouter = Router();

tagRouter
  .post("/", authMiddleware, tagController.createNewTagHandler)
  .put(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    tagController.updateTagByIdHandler
  )
  .delete(
    "/:tagId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    tagController.deleteTagByIdHandler
  )
  .get("/", tagController.getManyTagsHandler)
  .get("/:tagId", tagController.getTagByIdHandler);

export default tagRouter;
