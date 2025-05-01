import { Router } from "express";

export const usersRouter = Router();

usersRouter.put("/:userId").get("/:userId").get("/").delete("/:userId");
