import { RequestHandler } from "express";
import z from "zod";
import { apiUtils } from "../utils";

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
        const errorResponse = apiUtils.formatApiRespone(
          null,
          400,
          error.message,
          undefined,
          undefined,
          error.issues
        );
        res.status(400).json(errorResponse);
        return;
      }
      // If some other error occurs pass to catch all
      next(error);
    }
  };
