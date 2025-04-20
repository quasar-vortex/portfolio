import { RequestHandler } from "express";
import { HttpError } from "../error";
import { verifyUserToken } from "../auth/auth.utils";
import logger from "../logger";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    logger.warn({ ip: req.ip, url: req.url }, "Missing or invalid auth header");
    return next(
      new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Missing or invalid Authorization header",
      })
    );
  }
  const token = auth.slice(7);
  try {
    const { id, role } = await verifyUserToken("ACCESS", token);
    //@ts-ignore
    req.user = { id, role };
    next();
  } catch (e) {
    logger.warn(
      { ip: req.ip, url: req.url, err: e },
      "Token verification failed"
    );
    next(
      new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Invalid or expired token",
      })
    );
  }
};
