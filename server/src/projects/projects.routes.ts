import { Router } from "express";
import { authMiddleware, roleMiddleware } from "../middleware/auth.middleware";
import * as projectsController from "./projects.controller";

const projectsRouter = Router();

projectsRouter

  .get("/slug/:slug", projectsController.getProjectBySlugHandler)
  .get("/:projectId", projectsController.getProjectByIdHandler)
  .post(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    projectsController.createProjectHandler
  )
  .get("/", projectsController.getManyProjectsHandler)
  .patch(
    "/:projectId/feature",
    authMiddleware,
    roleMiddleware("ADMIN"),
    projectsController.toggleProjectFeatured
  )
  .patch(
    "/:projectId/publish",
    authMiddleware,
    roleMiddleware("ADMIN"),
    projectsController.toggleProjectPublished
  )
  .put(
    "/:projectId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    projectsController.updateProjectHandler
  )
  .delete(
    "/:projectId",
    authMiddleware,
    roleMiddleware("ADMIN"),
    projectsController.deleteProjectByIdHandler
  );

export { projectsRouter };
