import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const updateSignedInUserProfileHandler = asyncHandler(
  async (req, res, next) => {
    // Get the cookie token
    const refreshToken = req.cookies?.refreshToken;
    if (refreshToken) {
      // Verify the token and get the user id
      const { id } = await verifyUserToken(
        "REFRESH",
        req.cookies?.refreshToken
      );
      // Check if the user exists in the database
      const foundUser = await db.user.findUnique({
        where: { id },
        select: { refreshToken: true },
      });
      if (!foundUser)
        throw new HttpError({
          statusMessage: "NOT_AUTHORIZED",
          message: "User Not Found",
        });
      // Remove the token from the database
      if (foundUser.refreshToken) {
        await db.user.update({ where: { id }, data: { refreshToken: null } });
      }
      // Clear the cookie
      res.clearCookie("refreshToken", undefined);
    }

    res.status(200).json(formatApiRespone(null, 200, "User Signed Out"));
  }
);

export default {
  updateSignedInUserProfileHandler,
};
