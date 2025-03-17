import { FileType, User } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { QueryUserModel, UpdateUserProfileModel } from "../models/userModels";
import { apiUtils, asyncHandler, passUtils } from "../utils";
import { S3UploadedFile } from "../types";
import fileUtils from "../utils/fileUtils";
import logger from "../logger";

export const getAllUsersHandler = asyncHandler(async (req, res) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryUserModel;

  logger.info(
    { userId: req.user!.id, searchTerm, pageIndex, pageSize },
    "Fetching users..."
  );

  // Trim search term if provided
  const trimmedSearchTerm = searchTerm?.trim();

  // Define search filter (no need for `mode: "insensitive"` in MySQL)
  const where = trimmedSearchTerm
    ? {
        OR: [
          { firstName: { contains: trimmedSearchTerm } },
          { email: { contains: trimmedSearchTerm } },
        ],
      }
    : {};

  // Pagination Handling (Ensure valid values)
  const parsedPageIndex = Math.max(1, Number(pageIndex) || 1) - 1;
  const parsedPageSize = Math.max(1, Number(pageSize) || 10);
  const skip = parsedPageIndex * parsedPageSize;

  // Get total count
  const totalRecords = await db.user.count({ where });

  // Fetch paginated users
  const foundUsers = await db.user.findMany({
    where,
    skip,
    take: parsedPageSize,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      bio: true,
      avatarFile: { select: { id: true, url: true } },
      isActive: true,
      registeredAt: true,
      lastLoginAt: true,
      role: true,
    },
  });

  // Calculate total pages (ensure at least 1)
  const totalPages = Math.max(1, Math.ceil(totalRecords / parsedPageSize));

  logger.info(
    { userId: req.user!.id, totalRecords },
    "Users retrieved successfully."
  );

  // Return response
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundUsers,
      currentPage: parsedPageIndex + 1,
      totalPages,
      totalRecords,
      message: "Users retrieved successfully",
    })
  );
});

export const getUserProfileByIdHandler = asyncHandler(
  async (req, res, next) => {
    const signedInId = req.user?.id; // Optional, since auth is not required
    const role = req.user?.role;
    const userId = req.params.userId;

    logger.info({ signedInId, userId }, "Fetching user profile...");

    // Only Admins can view inactive users - others see only active profiles
    const where =
      role === "ADMIN" ? { id: userId } : { id: userId, isActive: true };

    const foundUser = await db.user.findUnique({
      where,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        bio: true,
        avatarFile: { select: { id: true, url: true } },
        isActive: true,
        registeredAt: true,
        lastLoginAt: true,
        role: true,
      },
    });

    if (!foundUser) {
      logger.warn({ signedInId, userId }, "User not found.");
      throw new HttpError({
        statusMessage: "NOT_FOUND",
        message: "User Not Found!",
      });
    }

    logger.info({ signedInId, userId }, "User profile retrieved successfully.");
    res.status(200).json(
      apiUtils.formatApiResponse({
        data: foundUser,
        message: "User retrieved successfully",
      })
    );
  }
);
export const updateUserProfileHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const signedInUserId = req.user!.id;

  logger.info(
    { signedInId: signedInUserId, userId },
    "Request to update user received."
  );

  const { bio, email, firstName, lastName, newPassword, password } =
    req.body as UpdateUserProfileModel;

  // Verify ownership of profile
  if (userId !== signedInUserId) {
    logger.error(
      { signedInId: signedInUserId, userId },
      "Unauthorized profile update attempt."
    );
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "You are not authorized to update this user!",
    });
  }

  // Find user
  const foundUser = await db.user.findUnique({ where: { id: userId } });
  if (!foundUser) {
    logger.error({ signedInId: signedInUserId, userId }, "User not found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User not found.",
    });
  }

  const { passwordHash } = foundUser;
  const updatePayload: Partial<User> = {};

  if (bio) updatePayload.bio = bio;
  if (firstName) updatePayload.firstName = firstName;
  if (lastName) updatePayload.lastName = lastName;
  if (email && email !== foundUser.email) updatePayload.email = email;

  // Ensure old password is provided when changing password
  if (newPassword && !password) {
    logger.error(
      { signedInId: signedInUserId, userId },
      "Old password required for update."
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Old password required to update to a new one.",
    });
  }

  // Verify password and prevent same password re-use
  if (newPassword && password) {
    const isPassValid = await passUtils.verifyPass(passwordHash, password);
    if (!isPassValid) {
      throw new HttpError({
        statusMessage: "NOT_AUTHORIZED",
        message: "Invalid password.",
      });
    }
    const isSamePassword = await passUtils.verifyPass(
      passwordHash,
      newPassword
    );
    if (isSamePassword) {
      throw new HttpError({
        statusMessage: "BAD_REQUEST",
        message: "New password cannot be the same as the old password.",
      });
    }
    updatePayload.passwordHash = await passUtils.hashPass(newPassword);
  }

  // Update user
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { ...updatePayload },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      bio: true,
      isActive: true,
      avatarFile: { select: { id: true, url: true } },
      registeredAt: true,
      lastLoginAt: true,
      role: true,
    },
  });

  logger.info(
    { signedInId: signedInUserId, userId },
    "User updated successfully."
  );
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: updatedUser,
      message: "User updated successfully",
    })
  );
});

export const uploadAvatarHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const signedInId = req.user!.id;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId,
    userId,
  };

  logger.info(logMeta, "Request to update avatar received.");

  // Verify user is authorized to update the avatar
  if (userId !== signedInId) {
    logger.error(
      logMeta,
      "Unauthorized attempt to update another user's avatar."
    );
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "Not authorized to update this user!",
    });
  }

  // Find user
  const foundUser = await db.user.findUnique({
    where: { id: userId },
    include: { avatarFile: true },
  });

  if (!foundUser) {
    logger.error(logMeta, "User not found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User not found.",
    });
  }

  // Delete existing avatar file if one exists
  if (foundUser.avatarFile) {
    logger.info(
      { ...logMeta, fileId: foundUser.avatarFile.id },
      "Removing existing avatar."
    );
    await fileUtils.deleteFile(foundUser.avatarFile.key);
    await db.file.delete({ where: { id: foundUser.avatarFile.id } });
  }

  // If no file is uploaded, return an error
  if (!req.file) {
    logger.warn(logMeta, "No file uploaded.");
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No file uploaded. Please select a file to upload.",
    });
  }

  const { mimetype, size, originalname, location, key } =
    req.file as S3UploadedFile;

  // Save the new avatar file in the database
  const dbFile = await db.file.create({
    data: {
      key,
      url: location,
      originalName: originalname,
      size,
      uploaderId: userId,
      fileType: mimetype.split("/")[0] as FileType, // type is checked in multer callback
    },
  });

  // Link the new avatar to the user
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { avatarFileId: dbFile.id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      bio: true,
      isActive: true,
      avatarFile: { select: { id: true, url: true } },
      registeredAt: true,
      lastLoginAt: true,
      role: true,
    },
  });

  logger.info(logMeta, "User avatar updated successfully.");
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: updatedUser,
      message: "Avatar updated successfully.",
    })
  );
});
export const deleteAvatarHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user?.id,
    userId,
  };

  logger.info(logMeta, "Request to delete avatar file received.");

  // Ensure only the user or an admin can delete an avatar
  if (req.user!.id !== userId && req.user!.role !== "ADMIN") {
    logger.error(logMeta, "Unauthorized avatar deletion attempt.");
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "You are not authorized to delete this avatar.",
    });
  }

  // Verify user exists
  const foundUser = await db.user.findUnique({
    where: { id: userId },
    include: { avatarFile: true },
  });

  if (!foundUser) {
    logger.error(logMeta, "User not found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User not found.",
    });
  }

  // Delete existing avatar file if one exists
  if (foundUser.avatarFile) {
    logger.info(
      { ...logMeta, fileId: foundUser.avatarFile.id },
      "Removing existing avatar."
    );
    await fileUtils.deleteFile(foundUser.avatarFile.key);
    await db.file.delete({ where: { id: foundUser.avatarFile.id } });

    // Remove avatar reference from user table
    await db.user.update({
      where: { id: userId },
      data: { avatarFileId: null },
    });
  }

  // Fetch updated user data
  const updatedUser = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      bio: true,
      isActive: true,
      registeredAt: true,
      lastLoginAt: true,
      role: true,
      avatarFile: true,
    },
  });

  logger.info(logMeta, "User avatar deleted successfully.");

  res.status(200).json(
    apiUtils.formatApiResponse({
      data: updatedUser,
      message: "Avatar deleted successfully.",
    })
  );
});

export const getPostsByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user?.id,
    userId,
  };

  logger.info(logMeta, "Request to get posts received.");

  // Check if author exists before querying posts
  const authorExists = await db.user.findUnique({
    where: { id: userId },
    select: { id: true },
  });

  if (!authorExists) {
    logger.warn(logMeta, "Author not found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "Author not found.",
    });
  }

  // Pagination handling
  const pageIndex = Math.max(1, Number(req.query.page) || 1) - 1;
  const pageSize = Math.max(1, Number(req.query.pageSize) || 10);
  const skip = pageIndex * pageSize;

  // Get paginated posts
  const foundPosts = await db.post.findMany({
    where: { authorId: userId, isPublished: true },
    select: {
      id: true,
      title: true,
      excerpt: true,
      coverImage: { select: { id: true, url: true } },
      content: true,
      authorId: true,
      isPublished: true,
      publishDate: true,
      slug: true,
    },
    take: pageSize,
    skip,
  });

  // Get total post count for pagination
  const totalRecords = await db.post.count({
    where: { authorId: userId, isPublished: true },
  });
  const totalPages = Math.ceil(totalRecords / pageSize);

  logger.info(logMeta, "Found posts successfully.");

  // Return response with pagination info
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundPosts,
      currentPage: pageIndex + 1,
      totalPages,
      totalRecords,
      message: "Found posts successfully.",
    })
  );
});

export const toggleUserStatusHandler = asyncHandler(async (req, res, next) => {
  const newStatus = req.body?.isActive;
  if (newStatus === undefined)
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "isActive Required to Change Status",
    });
  const userId = req.params.userId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
    userId,
  };

  logger.info(logMeta, "Request to change user status received.");

  // Prevent admins from disabling their own account
  if (req.user!.id === userId) {
    logger.error(logMeta, "User attempted to disable their own account.");
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "You cannot change your own status.",
    });
  }

  // Find user
  const foundUser = await db.user.findUnique({ where: { id: userId } });

  if (!foundUser) {
    logger.error(logMeta, "User not found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "User not found.",
    });
  }

  // Update user status
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: { isActive: newStatus },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      bio: true,
      isActive: true,
      avatarFile: { select: { id: true, url: true, key: true } },
      registeredAt: true,
      lastLoginAt: true,
      role: true,
    },
  });

  logger.info(logMeta, "User status updated successfully.");
  res.status(200).json(
    apiUtils.formatApiResponse({
      data: updatedUser,
      message: "User status updated successfully.",
    })
  );
});

export const deleteUserHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const signedInUser = req.user!.id;
  const role = req.user!.role;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
    userId,
  };
  logger.info(logMeta, "Request to change user status received.");

  // Verify Account Owner
  if (userId !== signedInUser) {
    logger.error(logMeta, "Attempt to delete another's account.");
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "Unable to delete another's account.",
    });
  }

  const foundFiles = await db.file.findMany({ where: { uploaderId: userId } });
  const foundPosts = await db.post.findMany({ where: { authorId: userId } });
  const foundProjects = await db.project.findMany({
    where: { authorId: userId },
  });
  // Clean Up Files
  if (foundFiles) {
    logger.info(logMeta, "Deleting user's files.");
    await Promise.all(
      foundFiles.map(async (f) => {
        return await fileUtils.deleteFile(f.key);
      })
    );
    await db.file.deleteMany({ where: { uploaderId: userId } });
  }
  // Clean Up Posts
  if (foundPosts) {
    logger.info(logMeta, "Deleting user's Posts.");
    await db.post.deleteMany({ where: { authorId: userId } });
  }
  // Clean Up Projects
  if (foundProjects) {
    logger.info(logMeta, "Deleting user's Projects.");
    await db.project.deleteMany({ where: { authorId: userId } });
  }
});

export default {
  getAllUsersHandler,
  getUserProfileByIdHandler,
  updateUserProfileHandler,
  getPostsByUserId,
  toggleUserStatusHandler,
  uploadAvatarHandler,
  deleteAvatarHandler,
  deleteUserHandler,
};
