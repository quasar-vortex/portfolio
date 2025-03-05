import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const updateSignedInUserProfileHandler = asyncHandler(
  async (req, res, next) => {}
);

export default {
  updateSignedInUserProfileHandler,
};
