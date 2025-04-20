import { RequestHandler } from "express";
import { HttpError } from "../error";
import { verifyUserToken } from "../auth/auth.utils";
import { z } from "zod";
import logger from "../logger";

export const valMiddleware: <T extends z.ZodTypeAny>(s: T) => RequestHandler =
  (s) => async (req, res, next) => {
    try {
      await s.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn(
          { ip: req.ip, method: req.method, url: req.url, error: error.issues },
          "Validation Request Failed"
        );
        res
          .status(400)
          .json({ error: error.issues, message: "Check Your Input" });
        return;
      }
      next(error);
    }
  };
