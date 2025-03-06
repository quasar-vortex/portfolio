import { asyncHandler, jwtUtils } from "../utils";
import HttpError from "../error";
import { CustomRequestHandler } from "../types";

export const authMiddleware: CustomRequestHandler = asyncHandler(
  async (req, res, next) => {
    const headers = req.headers as unknown as Record<
      string,
      string | undefined
    >;
    const authorizationHeader =
      headers["authorization"] || headers["Authorization"];

    if (!authorizationHeader)
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "Missing Access Token",
      });
    // Split on Bearer space, grab the token
    const parts = authorizationHeader.split(" ");
    if (parts.length === 2) {
      const decoded = await jwtUtils.verifyUserToken(
        "ACCESS",
        authorizationHeader.split(" ")[1]
      );
      req.user = decoded;
      next();
      return;
    }
    next(
      new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "Invalid Authorization Header / Token",
      })
    );
  }
);
