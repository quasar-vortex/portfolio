import { db } from "../db";
import { HttpError } from "../error";
import { User } from "../generated/prisma";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import argon from "argon2";
import { SearchUsersModel } from "./users.models";

const baseUserSelect = {
  id: true,
  firstName: true,
  lastName: true,
  bio: true,
  role: true,
  email: true,
  avatarFile: {
    select: {
      id: true,
      url: true,
    },
  },
};
const adminUserSelect = {
  ...baseUserSelect,
  isActive: true,
  lastLoginDate: true,
  registeredDate: true,
};
const updateUserProfileHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const toUpdateUserId = req.params.userId;
  const signedInUserId = req.user!.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInUserId,
    toUpdateId: toUpdateUserId,
  };
  try {
    logger.info(meta, "Request to update user");

    const {
      email,
      password,
      firstName,
      lastName,
      newPassword,
      role,
      bio,
      avatarFileId,
    } = req.body;
    const payload: Partial<User> = {
      email,
      firstName,
      lastName,
      role,
      avatarFileId,
      bio,
    };
    const foundUser = await db.user.findUnique({
      where: { id: toUpdateUserId },
    });
    if (!foundUser)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "User was not found to update!",
      });
    if (email) {
      payload.email = email;
    }
    if (newPassword) {
      if (newPassword !== password)
        throw new HttpError({
          status: "BAD_REQUEST",
          message: "Old and new password may not match.",
        });
      const isPassValid = await argon.verify(password, foundUser.passwordHash);
      if (!isPassValid)
        throw new HttpError({
          status: "NOT_AUTHORIZED",
          message: "Incorrect password.",
        });
      payload.passwordHash = await argon.hash(newPassword);
    }
    const updatedUser = await db.user.update({
      where: { id: toUpdateUserId },
      data: { ...payload, dateUpdated: new Date().toISOString() },
      select: baseUserSelect,
    });
    const message = "User was updated successfully";
    logger.info(meta, message);
    res.status(200).json({ data: updatedUser, message });
  } catch (error) {
    logger.warn({ error }, "Unable to update user profile");
    next(error);
  }
};
const getUserByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const signedInUserId = req.user?.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInUserId,
    toFindUserId: req.params.userId,
  };
  const isAdmin = req.user?.role === "ADMIN";
  try {
    logger.info(meta, "Request to find user");
    const where: { id: string; isActive?: boolean } = { id: req.params.userId };
    if (!isAdmin) where.isActive = true;
    const foundUser = await db.user.findUnique({
      where,
      select: isAdmin ? adminUserSelect : { ...baseUserSelect, email: false },
    });
    if (!foundUser)
      throw new HttpError({
        status: "NOT_FOUND",
        message: "Unable to find user.",
      });
    logger.info(meta, "User was found");
    res
      .status(200)
      .json({ data: foundUser, message: "Found user successfully!" });
  } catch (error) {
    logger.warn({ error }, "Unable to find user profile");
    next(error);
  }
};
const getManyUsersByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const signedInUserId = req.user?.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInUserId,
  };
  const isAdmin = req.user?.role === "ADMIN";
  try {
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Only an admin may search users!",
      });
    const {
      pageIndex = "1",
      pageSize = "10",
      firstName,
      lastName,
      email,
    } = req.query as SearchUsersModel;

    const trimmedFirst = firstName?.trim(),
      trimmedLast = lastName?.trim(),
      trimmedEmail = email?.trim();

    const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
    const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);
    const where: {
      AND: {
        [key: string]: {
          contains: string;
        };
      }[];
    } = { AND: [] };
    if (trimmedFirst) where.AND.push({ firstName: { contains: trimmedFirst } });
    if (trimmedLast) where.AND.push({ lastName: { contains: trimmedLast } });
    if (trimmedEmail) where.AND.push({ email: { contains: trimmedEmail } });
    const foundUsers = await db.user.findMany({
      where,
      select: adminUserSelect,
      take: size,
      skip: index * size,
    });

    const userCount = await db.user.count({
      where,
      take: size,
      skip: index * size,
    });

    logger.info(meta, "Users found successfully!");
    res.status(200).json({
      message: "Users found successfully!",
      data: foundUsers,
      meta: {
        pageSize: size,
        pageIndex: index + 1,
        totalPages: Math.ceil(userCount / size),
      },
    });
  } catch (error) {
    logger.warn({ error }, "Unable to find users.");
    next(error);
  }
};
const deleteUserByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const toDeleteId = req.params.userId;
  const signedInUserId = req.user?.id;
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId: signedInUserId,
    toDeleteId,
  };
  const isAdmin = req.user?.role === "ADMIN";
  try {
    logger.info(meta, "Deactivating user.");
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to delete a user!",
      });
    await db.$transaction(async (tx) => {
      // deactivate db files
      await tx.file.updateMany({
        where: { userId: toDeleteId },
        data: {
          isActive: false,
          updatedById: signedInUserId,
          dateUpdated: new Date().toISOString(),
        },
      });
      // deactivate projects
      await tx.project.updateMany({
        where: { authorId: toDeleteId },
        data: {
          isActive: false,
          isFeatured: false,
          isPublished: false,
          updatedById: signedInUserId,
          updatedDate: new Date().toISOString(),
        },
      });
      // deactivate posts
      await tx.post.updateMany({
        where: { authorId: toDeleteId },
        data: {
          isActive: false,
          isFeatured: false,
          isPublished: false,
          updatedById: signedInUserId,
          updatedDate: new Date().toISOString(),
        },
      });
      // deactivate user
      await tx.user.update({
        where: { id: toDeleteId },
        data: {
          isActive: false,
          refreshToken: null,
          updatedById: signedInUserId,
          dateUpdated: new Date().toISOString(),
        },
      });
    });
    const user = await db.user.findUnique({
      where: { id: toDeleteId },
      select: adminUserSelect,
    });
    logger.info(meta, "User deactivated.");
    res.status(200).json({ data: user, message: "User was deactivated" });
  } catch (error) {
    logger.warn({ error }, "Unable to find users.");
    next(error);
  }
};

export {
  baseUserSelect,
  adminUserSelect,
  updateUserProfileHandler,
  getUserByIdHandler,
  getManyUsersByIdHandler,
  deleteUserByIdHandler,
};
