import { FileType } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { apiUtils, asyncHandler } from "../utils";
import fileUtils from "../utils/fileUtils";
import { S3UploadedFile } from "../types";
import { QueryFileModel } from "../models/fileModels";
import logger from "../logger";

const { formatApiRespone } = apiUtils;

// Upload file
const uploadFileHandler = asyncHandler(async (req, res, next) => {
  const file = req.file as S3UploadedFile | undefined;
  const userId = req.user!.id;

  logger.info(
    { userId, method: req.method, url: req.url, ip: req.ip },
    "Upload request received"
  );

  if (!file) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File Provided",
    });
  }

  const mimeType = file.mimetype.toLowerCase();
  const fileType: FileType = mimeType.startsWith("image") ? "IMAGE" : "VIDEO";

  const { key, originalname, size, location: url } = file;

  const newFile = await db.file.create({
    data: {
      key,
      originalName: originalname,
      size,
      url,
      uploaderId: userId,
      fileType,
    },
  });

  logger.info({ userId, fileId: newFile.id }, "File uploaded successfully");

  res.status(201).json(formatApiRespone(newFile, 201, "File Uploaded"));
});

// Delete file (owner or admin)
const deleteFileByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const fileId = req.params.fileId;

  logger.info({ userId, fileId }, "Delete file request received");

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File to Delete",
    });
  }

  // Allow deletion if the user is the uploader or an admin
  const isAdmin = req.user!.role === "ADMIN";
  if (foundFile.uploaderId !== userId && !isAdmin) {
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "Unauthorized file deletion.",
    });
  }

  await fileUtils.deleteFile(foundFile.key);
  await db.file.delete({ where: { id: fileId } });

  logger.info({ fileId }, "File deleted successfully");

  res.status(200).json(formatApiRespone(null, 200, "File Deleted"));
});

// Admin file deletion (any file)
const deleteFileAdminHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;
  logger.info({ fileId }, "Admin delete file request received");

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File to Delete",
    });
  }

  await fileUtils.deleteFile(foundFile.key);
  await db.file.delete({ where: { id: fileId } });

  logger.info({ fileId }, "File deleted by admin");

  res.status(200).json(formatApiRespone(null, 200, "Admin Deleted File"));
});

// Get file by ID
const getFileByIdHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;

  logger.info({ fileId }, "Get file request received");

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "No File Found",
    });
  }

  res
    .status(200)
    .json(formatApiRespone(foundFile, 200, "Found File Successfully."));
});

// Get all files (admin)
const getManyFilesHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryFileModel;
  const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
  const skip = Math.max(parseInt(pageIndex || "0") * take, 0);

  const where = searchTerm ? { originalName: { contains: searchTerm } } : {};

  logger.info({ searchTerm, pageIndex, pageSize }, "Fetching files");

  const [foundFiles, totalFiles] = await Promise.all([
    db.file.findMany({ skip, where, take }),
    db.file.count({ where }),
  ]);

  res
    .status(200)
    .json(
      formatApiRespone({ foundFiles, totalFiles }, 200, "Files Retrieved.")
    );
});

// Get files uploaded by the signed-in user
const getUsersFilesHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const { pageIndex, pageSize, searchTerm } = req.query as QueryFileModel;
  const take = Math.min(Math.max(parseInt(pageSize || "10"), 10), 50);
  const skip = Math.max(parseInt(pageIndex || "0") * take, 0);

  const where = searchTerm
    ? { uploaderId: userId, originalName: { contains: searchTerm } }
    : { uploaderId: userId };

  logger.info({ userId }, "Fetching user files");

  const foundFiles = await db.file.findMany({ skip, where, take });

  res
    .status(200)
    .json(
      formatApiRespone({ files: foundFiles }, 200, "User Files Retrieved.")
    );
});

export default {
  uploadFileHandler,
  deleteFileByIdHandler,
  deleteFileAdminHandler,
  getFileByIdHandler,
  getManyFilesHandler,
  getUsersFilesHandler,
};
