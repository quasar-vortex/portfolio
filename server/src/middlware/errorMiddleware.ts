import { ErrorRequestHandler } from "express";
import { apiUtils } from "../utils";
import HttpError from "../error";
import logger from "../logger";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(
    { method: req.method, url: req.url, ip: req.ip },
    err?.message || "INTERNAL_ERROR"
  );
  res
    .status(err instanceof HttpError ? err.status : 500)
    .json(
      apiUtils.formatApiRespone(
        null,
        err instanceof HttpError ? err.status : 500,
        err instanceof HttpError ? err.message : "INTERNAL_ERROR"
      )
    );
};
export default errorMiddleware;
