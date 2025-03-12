import { Router } from "express";
import { projectController } from "../controllers";
import { authMiddleware, roleMiddleware } from "../middleware";

/*
POST   /projects               Create a new project (authenticated users)
GET    /projects/:slug         Get a project by slug (public)
GET    /projects               Get all published projects (public, searchable)
GET    /projects/me            Get the authenticated user's projects
PUT    /projects/me/:projectId Update a project (only owner)
DELETE /projects/me/:projectId Delete a project (only owner)
GET    /projects/admin         Admin gets all projects (searchable)
PUT    /projects/admin/:projectId  Admin updates any project
DELETE /projects/admin/:projectId  Admin deletes any project
*/

const projectRouter = Router();

// Public Routes
projectRouter.get("/projects/:slug", projectController.getProjectBySlugHandler);
projectRouter.get("/projects", projectController.getManyProjectsHandler(false));

// User-Specific Routes (Require Authentication)
projectRouter.use(authMiddleware);
projectRouter.post("/projects", projectController.createNewProjectHandler);
projectRouter.get(
  "/projects/me",
  projectController.getManyProjectsHandler(false)
);
projectRouter.put(
  "/projects/me/:projectId",
  projectController.editProjectHandler(false)
);
projectRouter.delete(
  "/projects/me/:projectId",
  projectController.deleteProjectByIdHandler(false)
);

// Admin Routes (Require Admin Privileges)
projectRouter.use(roleMiddleware("ADMIN"));
projectRouter.get(
  "/projects/admin",
  projectController.getManyProjectsHandler(true)
);
projectRouter.put(
  "/projects/admin/:projectId",
  projectController.editProjectHandler(true)
);
projectRouter.delete(
  "/projects/admin/:projectId",
  projectController.deleteProjectByIdHandler(true)
);

export default projectRouter;
