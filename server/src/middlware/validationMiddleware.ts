import { RequestHandler } from "express";
import z from "zod";
import { formatApiRespone } from "../utils/apiUtils";

export const validateSchema: (s: z.ZodSchema) => RequestHandler =
  (s) => async (req, res, next) => {
    try {
      // verify body, params, and query match schemas
      await s.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      // Return issues if fails on validation
      if (error instanceof z.ZodError) {
        res.json(
          formatApiRespone(
            null,
            400,
            error.message,
            undefined,
            undefined,
            error.issues
          )
        );
        return;
      }
      // If some other error occurs pass to catch all
      next(error);
    }
  };
