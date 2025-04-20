import { ErrorRequestHandler } from "express";
import { HttpError } from "../error";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  let message = "Internal Error",
    statusCode = 500;
  if (err instanceof HttpError) {
    res.status(err.code).json({ message: err.message });
    return;
  }
  res.status(statusCode).json({ message });
};
