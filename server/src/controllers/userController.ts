import { User } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { QueryUserModel, UpdateUserProfileModel } from "../models/userModels";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";
import fileUtils from "../utils/fileUtils";

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

const getManyUsersHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryUserModel;

  let take = parseInt(pageSize || "10");
  let skip = parseInt(pageIndex || "0") * take;

  // Ensure pagination values are within valid ranges
  if (Number.isNaN(skip) || skip < 0) skip = 0;
  if (Number.isNaN(take) || take < 10) take = 10;
  if (take > 50) take = 50;

  const trimmedSearch = searchTerm?.trim();

  const where = trimmedSearch
    ? {
        OR: [
          { firstName: { contains: trimmedSearch } },
          { lastName: { contains: trimmedSearch } },
          { email: { contains: trimmedSearch } },
        ],
      }
    : {};

  // Fetch paginated users and total count
  const [foundUsers, totalUsers] = await Promise.all([
    db.user.findMany({
      select: { ...selectUser },
      where,
      take,
      skip,
    }),
    db.user.count({ where }),
  ]);

  const totalPages = Math.ceil(totalUsers / take);
  const currentPage = Math.floor(skip / take) + 1; // Convert to 1-based index

  res.status(200).json(
    formatApiRespone(
      {
        users: foundUsers,
        totalUsers,
        totalPages,
        currentPage,
        pageSize: take,
      },
      200,
      "Users Retrieved."
    )
  );
});

/* 
Will need to check if the user has an avatar file
Then delete the file from storage if it exists prior to user deletion
*/
const deleteSignedInUserHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  // Delete the users' projects
  const userProjects = await db.project.deleteMany({
    where: { authorId: userId },
  });
  // Delete the user's posts
  const userPosts = await db.post.deleteMany({
    where: { authorId: userId },
  });
  // Get the files for the user
  const userFiles = await db.file.findMany({ where: { uploaderId: userId } });
  // Delete the files from s3
  await Promise.all(
    userFiles.map(async (f) => {
      return await fileUtils.deleteFile(f.key);
    })
  );
  // Delete the user from the db
  await db.user.delete({ where: { id: userId } });
  res
    .status(200)
    .json(formatApiRespone(null, 200, "User Deleted Successfully."));
});

export default {
  updateSignedInUserProfileHandler,
  getSignedInUserProfile,
  getUserByIdHandler,
  getManyUsersHandler,
  deleteSignedInUserHandler,
};
