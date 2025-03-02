import { ErrorRequestHandler } from "express";
import { formatApiRespone } from "../utils/apiUtils";
import HttpError from "../error";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res
    .status(500)
    .json(
      formatApiRespone(
        null,
        err instanceof HttpError ? err.status : 500,
        err instanceof HttpError ? err.message : "INTERNAL_ERROR"
      )
    );
};
