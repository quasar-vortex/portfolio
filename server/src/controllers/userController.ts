import { User } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { UpdateUserProfileModel } from "../models/userModels";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const updateSignedInUserProfileHandler = asyncHandler(
  async (req, res, next) => {
    const signedInId = req.user!.id;
    // find the signed in user
    const foundUser = await db.user.findUnique({
      where: { id: signedInId },
      select: { ...selectUser, passwordHash: true },
    });
    // If the user isn't found throw not authorized
    if (!foundUser)
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "user Not Found",
      });

    const {
      avatarFileId,
      bio,
      email,
      firstName,
      lastName,
      password,
      newPassword,
    } = req.body as UpdateUserProfileModel;

    // Build Update Payload
    const updatePayload: Partial<User> = {};
    if (avatarFileId) updatePayload.avatarFileId = avatarFileId;
    if (bio) updatePayload.bio = bio;
    if (email) updatePayload.email = email;
    if (firstName) updatePayload.firstName = firstName;
    if (lastName) updatePayload.lastName = lastName;
    if (newPassword) {
      // Ensure password is there if updating to new one
      if (newPassword && !password)
        throw new HttpError({
          statusMessage: "BAD_REQUEST",
          message: "Updating Password Requires Current Password",
        });
      // Verfiy old matches hash
      const isPassValid = await passUtils.verifyPass(
        foundUser.passwordHash,
        password!
      );
      if (!isPassValid)
        throw new HttpError({
          statusMessage: "NOT_AUTHORIZED",
          message: "Password Is Incorrect.",
        });
      // Add new password to payload
      updatePayload.passwordHash = await passUtils.hashPass(newPassword);
    }
    if (Object.keys(updatePayload).length === 0)
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "There is no update to perform.",
      });
    // Update the user in the DB
    const updatedUser = await db.user.update({
      where: { id: signedInId },
      data: { ...updatePayload },
      select: { ...selectUser },
    });
    // return the updated user
    res
      .status(200)
      .json(
        formatApiRespone(updatedUser, 200, "User Was Updated Successfully")
      );
  }
);

const getSignedInUserProfile = asyncHandler(async (req, res, next) => {
  const signedInId = req.user!.id;
  const foundUser = await db.user.findUnique({
    where: { id: signedInId },
    select: { ...selectUser },
  });
  if (!foundUser)
    throw new HttpError({
      statusMessage: "NOT_AUTHORIZED",
      message: "User Not Found",
    });
  res
    .status(200)
    .json(formatApiRespone(foundUser, 200, "User Profile Retrieved."));
});
const getUserByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const foundUser = await db.user.findUnique({
    where: { id: userId },
    select: { ...selectUser },
  });
  if (!foundUser)
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User Not Found",
    });
  res
    .status(200)
    .json(formatApiRespone(foundUser, 200, "User Profile Retrieved."));
});
// May add pagination later if I add admin features for user management to the app
// Primary focus first to get blog up and running then enhance and add admin capabilities.
const getManyUsersHandler = asyncHandler(async (req, res, next) => {
  const foundUsers = await db.user.findMany({ select: { ...selectUser } });
  res.status(200).json(formatApiRespone(foundUsers, 200, "Users Retrieved."));
});

export default {
  updateSignedInUserProfileHandler,
  getSignedInUserProfile,
  getUserByIdHandler,
  getManyUsersHandler,
};
