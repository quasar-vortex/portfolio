import { NextFunction, RequestHandler, Response, Request } from "express";
import { Prisma, Role } from "./generated/prisma";

type User = {
  id: string;
  role: Role;
};
declare global {
  namespace Express {
    interface Request {
      user?: User; // or `user: User` if you always guarantee it’s there
    }
  }
}

type AuthenticatedRequest = Request & {
  user?: User;
};

export type AuthenticatedRequestHandler = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => void;
