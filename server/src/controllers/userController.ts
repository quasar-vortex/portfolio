import { FileType, User } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { QueryUserModel, UpdateUserProfileModel } from "../models/userModels";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";
import fileUtils from "../utils/fileUtils";
import { PublicUser, S3UploadedFile } from "../types";
import logger from "../logger";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

/*
 Get public user profile by ID (Guest/User/Admin)
 Returns name and avatar file
 */
const getUserByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  const foundUser = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      avatarFile: { select: { id: true, url: true } },
    },
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

/*
Get the signed-in user's profile (User/Admin)
Returns user details except password
*/
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

/*
  Update the signed-in user's profile (User/Admin)
  Allows updating firstName, lastName, email, bio, avatar, and password
*/
const updateSignedInUserProfileHandler = asyncHandler(
  async (req, res, next) => {
    const signedInId = req.user!.id;

    const foundUser = await db.user.findUnique({
      where: { id: signedInId },
      select: { ...selectUser, passwordHash: true },
    });

    if (!foundUser)
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "User Not Found",
      });

    const { bio, email, firstName, lastName, password, newPassword } =
      req.body as UpdateUserProfileModel;

    const updatePayload: Partial<User> = {};
    if (bio) updatePayload.bio = bio;
    if (email) updatePayload.email = email;
    if (firstName) updatePayload.firstName = firstName;
    if (lastName) updatePayload.lastName = lastName;

    if (newPassword) {
      if (!password)
        throw new HttpError({
          statusMessage: "BAD_REQUEST",
          message: "Updating Password Requires Current Password",
        });

      const isPassValid = await passUtils.verifyPass(
        foundUser.passwordHash,
        password!
      );
      if (!isPassValid)
        throw new HttpError({
          statusMessage: "NOT_AUTHORIZED",
          message: "Incorrect Current Password.",
        });

      updatePayload.passwordHash = await passUtils.hashPass(newPassword);
    }

    if (Object.keys(updatePayload).length === 0)
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "No updates provided.",
      });

    const updatedUser = await db.user.update({
      where: { id: signedInId },
      data: { ...updatePayload },
      select: { ...selectUser },
    });

    res
      .status(200)
      .json(formatApiRespone(updatedUser, 200, "User Updated Successfully"));
  }
);

/*
Get paginated list of users (Admin Only)
*/
const getManyUsersHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryUserModel;
  let take = parseInt(pageSize || "10");
  let skip = parseInt(pageIndex || "0") * take;

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

  const [foundUsers, totalUsers] = await Promise.all([
    db.user.findMany({
      select: { ...selectUser },
      where,
      take,
      skip,
    }),
    db.user.count({ where }),
  ]);

  res.status(200).json(
    formatApiRespone(
      {
        users: foundUsers,
        totalUsers,
        totalPages: Math.ceil(totalUsers / take),
        currentPage: Math.floor(skip / take) + 1,
        pageSize: take,
      },
      200,
      "Users Retrieved."
    )
  );
});

/*
  Upload or Replace User Avatar (User/Admin)
*/ const createOrReplaceUserAvatarHandler = asyncHandler(
  async (req, res, next) => {
    const userId = req.user!.id;
    const file = req.file as unknown as S3UploadedFile | undefined;

    logger.info(
      { method: req.method, url: req.url, ip: req.ip, userId },
      "Avatar upload request received"
    );

    if (!file) {
      logger.error(
        { method: req.method, url: req.url, ip: req.ip, userId },
        "No file provided"
      );
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "No File Provided",
      });
    }

    let mimeType = file.mimetype.toLowerCase();
    const fileType: FileType = mimeType.split("/")[0] as FileType;

    const { key, originalname, size, location: url } = file;

    // Check if user has an existing avatar
    const existingAvatar = await db.user.findUnique({
      where: { id: userId },
      select: { avatarFileId: true },
    });

    // Create a new file record
    const newAvatarFile = await db.file.create({
      data: {
        key,
        originalName: originalname,
        size,
        url,
        uploaderId: userId,
        fileType,
      },
    });

    // Update user with new avatar file
    await db.user.update({
      where: { id: userId },
      data: { avatarFileId: newAvatarFile.id },
    });

    // Delete the old avatar file from storage and database if it exists
    if (existingAvatar?.avatarFileId) {
      const oldAvatar = await db.file.findUnique({
        where: { id: existingAvatar.avatarFileId },
      });

      if (oldAvatar) {
        await fileUtils.deleteFile(oldAvatar.key);
        await db.file.delete({ where: { id: oldAvatar.id } });

        logger.info(
          {
            method: req.method,
            url: req.url,
            ip: req.ip,
            userId,
            oldAvatarId: oldAvatar.id,
          },
          "Old avatar deleted successfully"
        );
      }
    }

    logger.info(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId,
        newAvatarId: newAvatarFile.id,
      },
      "Avatar uploaded successfully"
    );

    res
      .status(201)
      .json(
        formatApiRespone(newAvatarFile, 201, "Avatar Updated Successfully")
      );
  }
);

/* 
  Delete Signed-In User
*/
const deleteSignedInUserHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id; // Always use signed-in user's ID
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Delete User Request Received"
  );
  // Find the user's files before deletion
  const userFiles = await db.file.findMany({ where: { uploaderId: userId } });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting Found Files"
  );
  // Delete associated files from storage
  await Promise.all(
    userFiles.map(async (file) => fileUtils.deleteFile(file.key))
  );

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting Posts and Projects"
  );
  // Delete user-related records
  await db.post.deleteMany({ where: { authorId: userId } });
  await db.project.deleteMany({ where: { authorId: userId } });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting User"
  );
  // Delete user
  await db.user.delete({ where: { id: userId } });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "User Deleted Succesfully"
  );
  res
    .status(200)
    .json(formatApiRespone(null, 200, "User Deleted Successfully."));
});

const deleteUserByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Delete User Request Received"
  );
  const userToDelete = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, avatarFileId: true },
  });

  if (!userToDelete) {
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User Not Found",
    });
  }

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting Found Files"
  );
  // Delete associated files
  const userFiles = await db.file.findMany({ where: { uploaderId: userId } });
  await Promise.all(
    userFiles.map(async (file) => fileUtils.deleteFile(file.key))
  );

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting Posts and Projects"
  );
  // Delete user-related records
  await db.post.deleteMany({ where: { authorId: userId } });
  await db.project.deleteMany({ where: { authorId: userId } });
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Deleting User"
  );
  // Delete user
  await db.user.delete({ where: { id: userId } });
  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "User Deleted Succesfully"
  );
  res
    .status(200)
    .json(formatApiRespone(null, 200, "User Deleted Successfully."));
});

export default {
  getUserByIdHandler,
  getSignedInUserProfile,
  updateSignedInUserProfileHandler,
  getManyUsersHandler,
  createOrReplaceUserAvatarHandler,
  deleteSignedInUserHandler,
  deleteUserByIdHandler,
};
