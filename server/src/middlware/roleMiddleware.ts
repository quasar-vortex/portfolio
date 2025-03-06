import { asyncHandler } from "../utils";
import HttpError from "../error";
import { CustomRequestHandler } from "../types";
import { db } from "../db";
import { userModels } from "../models";

export const roleMiddleware: (
  role: "ADMIN" | "USER"
) => CustomRequestHandler = (requiredRole) =>
  asyncHandler(async (req, res, next) => {
    const userId = req.user!.id;
    const dbUser = await db.user.findUnique({
      where: { id: userId },
      select: { ...userModels.selectUser },
    });
    if (!dbUser) {
      next(
        new HttpError({
          statusMessage: "NOT_AUTHORIZED",
          message: "Invalid User",
        })
      );
      return;
    }
    const { role } = dbUser;
    if (requiredRole !== role) {
      next(
        new HttpError({
          statusMessage: "FORBIDDEN",
          message: `You are not authorized to access this resource. You must be a ${requiredRole}.`,
        })
      );
      return;
    }
    next();
  });
