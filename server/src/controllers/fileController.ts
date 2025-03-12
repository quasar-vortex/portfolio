import { FileType } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { apiUtils, asyncHandler } from "../utils";
import fileUtils from "../utils/fileUtils";
import { S3UploadedFile } from "../types";
import { QueryFileModel } from "../models/fileModels";
import logger from "../logger";

const { formatApiRespone } = apiUtils;

const uploadFileHandler = asyncHandler(async (req, res, next) => {
  const file = req.file as unknown as S3UploadedFile | undefined;
  const userId = req.user!.id;
  let fileType: FileType = "IMAGE";

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId },
    "Upload request received"
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
  fileType = mimeType.split("/")[0] as FileType;

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

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId,
      fileId: newFile.id,
    },
    "File uploaded successfully"
  );

  res.status(201).json(formatApiRespone(newFile, 201, "File Uploaded"));
});

const deleteFileByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const fileId = req.params.fileId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId, fileId },
    "Delete file request received"
  );

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, userId, fileId },
      "File not found"
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File to Delete",
    });
  }

  if (foundFile.uploaderId !== userId) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, userId, fileId },
      "Unauthorized delete attempt"
    );
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "May not delete another's files.",
    });
  }

  await fileUtils.deleteFile(foundFile.key);
  await db.file.delete({ where: { id: fileId, uploaderId: userId } });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId, fileId },
    "File deleted successfully"
  );

  res.status(200).json(formatApiRespone(null, 200, "File Deleted"));
});

const deleteFileAdminHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const fileId = req.params.fileId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId, fileId },
    "Delete file request received"
  );

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, userId, fileId },
      "File not found"
    );
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File to Delete",
    });
  }

  await fileUtils.deleteFile(foundFile.key);
  await db.file.delete({ where: { id: fileId, uploaderId: userId } });

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, userId, fileId },
    "File deleted successfully"
  );

  res.status(200).json(formatApiRespone(null, 200, "File Deleted"));
});

const getFileByIdHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, fileId },
    "Get file request received"
  );

  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  if (!foundFile) {
    logger.error(
      { method: req.method, url: req.url, ip: req.ip, fileId },
      "File not found"
    );
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "No File Found",
    });
  }

  logger.info(
    { method: req.method, url: req.url, ip: req.ip, fileId },
    "File retrieved successfully"
  );

  res
    .status(200)
    .json(formatApiRespone(foundFile, 200, "Found File Successfully."));
});

const getManyFilesHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryFileModel;

  let take = parseInt(pageSize || "10");
  let skip = parseInt(pageIndex || "0") * take;

  if (Number.isNaN(skip) || skip < 0) skip = 0;
  if (Number.isNaN(take) || take < 10) take = 10;
  if (take > 50) take = 50;

  const trimmedSearch = searchTerm?.trim();

  const where = trimmedSearch
    ? { originalName: { contains: trimmedSearch } }
    : {};

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      searchTerm,
      pageIndex,
      pageSize,
    },
    "Fetching files"
  );

  const [foundFiles, totalFiles] = await Promise.all([
    db.file.findMany({ skip, where, take }),
    db.file.count({ where }),
  ]);

  const totalPages = Math.ceil(totalFiles / take);
  const currentPage = Math.floor(skip / take) + 1;

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      totalFiles,
      currentPage,
      totalPages,
    },
    "Files retrieved successfully"
  );

  res.status(200).json(
    formatApiRespone(
      {
        files: foundFiles,
        totalFiles,
        totalPages,
        currentPage,
        pageSize: take,
      },
      200,
      "Files Retrieved."
    )
  );
});

const getUsersFilesHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const { pageIndex, pageSize, searchTerm } = req.query as QueryFileModel;

  let take = parseInt(pageSize || "10");
  let skip = parseInt(pageIndex || "0") * take;

  if (Number.isNaN(skip) || skip < 0) skip = 0;
  if (Number.isNaN(take) || take < 10) take = 10;
  if (take > 50) take = 50;

  const trimmedSearch = searchTerm?.trim();

  const where = trimmedSearch
    ? { originalName: { contains: trimmedSearch }, uploaderId: userId }
    : { uploaderId: userId };

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId,
      searchTerm,
      pageIndex,
      pageSize,
    },
    "Fetching user files"
  );

  const [foundFiles, totalFiles] = await Promise.all([
    db.file.findMany({ skip, where, take }),
    db.file.count({ where }),
  ]);

  const totalPages = Math.ceil(totalFiles / take);
  const currentPage = Math.floor(skip / take) + 1;

  logger.info(
    {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userId,
      totalFiles,
      currentPage,
      totalPages,
    },
    "User files retrieved successfully"
  );

  res.status(200).json(
    formatApiRespone(
      {
        files: foundFiles,
        totalFiles,
        totalPages,
        currentPage,
        pageSize: take,
      },
      200,
      "User Files Retrieved."
    )
  );
});

export default {
  uploadFileHandler,
  deleteFileByIdHandler,
  getManyFilesHandler,
  getFileByIdHandler,
  getUsersFilesHandler,
  deleteFileAdminHandler,
};
