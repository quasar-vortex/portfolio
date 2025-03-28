import { asyncHandler } from "../utils";
import HttpError from "../error";
import { CustomRequestHandler } from "../types";
import { db } from "../db";
import { userModels } from "../models";
import { User } from "@prisma/client";

const roleMiddleware: (role: User["role"]) => CustomRequestHandler = (
  requiredRole
) =>
  asyncHandler(async (req, res, next) => {
    // Find the user
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
    // Check the role
    const { role } = dbUser;
    if (requiredRole !== role) {
      next(
        new HttpError({
          statusMessage: "NOT_AUTHORIZED",
          message: `You are not authorized to access this resource. You must be a ${requiredRole}.`,
        })
      );
      return;
    }
    req.user!.role = role;
    // continue
    next();
  });

export default roleMiddleware;
