import { RequestHandler } from "express";
import { HttpError } from "../error";
import { verifyUserToken } from "../auth/auth.utils";
import logger from "../logger";
import { Role } from "../generated/prisma";

// Helper to extract and validate a Bearer token
function getBearerToken(header?: string): string {
  if (!header?.startsWith("Bearer ")) {
    throw new HttpError({
      status: "NOT_AUTHORIZED",
      message: "Missing or invalid Authorization header",
    });
  }
  // Slice to after bearer
  return header.slice(7);
}

const authMiddleware: RequestHandler = async (req, res, next) => {
  const meta = { ip: req.ip, method: req.method, url: req.url };
  logger.info(meta, "Verifying access token");

  try {
    const token = getBearerToken(req.headers.authorization);
    const { id, role } = await verifyUserToken("ACCESS", token);

    // @ts-ignore: Global typing issue with user
    req.user = { id, role };

    return next();
  } catch (err: any) {
    logger.warn({ ...meta, error: err }, "Authentication failed");
    return next(
      new HttpError({
        status: "NOT_AUTHORIZED",
        message: err.message ?? "Invalid or expired token",
      })
    );
  }
};

const roleMiddleware =
  (requiredRole: Role): RequestHandler =>
  async (req, res, next) => {
    const meta = { ip: req.ip, method: req.method, url: req.url };
    logger.info(meta, `Checking for role ${requiredRole}`);

    try {
      // @ts-ignore: Global typing issue with user
      const user = req.user;
      if (!user?.id || !user?.role) {
        throw new HttpError({
          status: "NOT_AUTHORIZED",
          message: "User not authenticated",
        });
      }

      if (user.role !== requiredRole) {
        throw new HttpError({
          status: "NOT_AUTHORIZED",
          message: `Requires role ${requiredRole}, but user has ${user.role}`,
        });
      }

      return next();
    } catch (err: any) {
      logger.warn({ ...meta, error: err }, "Role check failed");
      return next(err);
    }
  };

export { authMiddleware, roleMiddleware };
