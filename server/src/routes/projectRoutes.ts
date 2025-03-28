import { Router } from "express";

/*
POST / Create new projcet (author)
GET  /:slug Get projcet details (public)
PUT /:projectId Update projcet details (author)
PUT /:projectId/publish Update project publish status (admin, author)
PUT /:projectId/feature Update project fature status (admin)
GET / Get many projects and search them (public)
DELETE /:projectId Delete post (owner, admin)
*/

const projectsRouter = Router();

projectsRouter;

export default projectsRouter;
