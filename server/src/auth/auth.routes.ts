import { Router } from "express";

export const authRouter = Router();

authRouter.post("/register").post("/login").get("/refresh").get("/logoff");
