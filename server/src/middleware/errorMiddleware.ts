import { ErrorRequestHandler } from "express";
import { apiUtils } from "../utils";
import HttpError from "../error";
import logger from "../logger";

const { formatApiResponse } = apiUtils;

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err instanceof HttpError ? err.status : 500;
  const message = err instanceof HttpError ? err.message : "INTERNAL_ERROR";

  logger.error(
    { method: req.method, url: req.url, ip: req.ip, stack: err?.stack },
    message
  );

  res.status(statusCode).json(formatApiResponse({ statusCode, message }));
};

export default errorMiddleware;
