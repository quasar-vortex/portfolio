import { Request, Response, NextFunction } from "express";
export type CustomRequestHandler = (
  req: Request & { user?: { id: string } },
  res: Response,
  next: NextFunction
) => void;
