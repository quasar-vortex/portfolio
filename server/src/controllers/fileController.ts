import { FileType } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { apiUtils, asyncHandler } from "../utils";
import { S3UploadedFile } from "../types";
import fileUtils from "../utils/fileUtils";
import logger from "../logger";

export const uploadFileHandler = asyncHandler(async (req, res, next) => {
  const file = req.file as S3UploadedFile;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  logger.info(logMeta, "Request to upload file received.");

  if (!file) {
    logger.error(logMeta, "No file to upload provided.");
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "File Required.",
    });
  }

  const dbFile = await db.file.create({
    data: {
      uploaderId: req.user!.id,
      key: file.key,
      originalName: file.originalname,
      size: file.size,
      url: file.location,
      fileType: file.mimetype.split("/")[0] as FileType,
    },
  });

  res.status(201).json(
    apiUtils.formatApiResponse({
      data: { id: dbFile.id, url: dbFile.url },
      message: "File Uploaded Successfully",
    })
  );
});

export const getFileByIdHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  logger.info(logMeta, "Request to retrieve file received.");

  const foundFile = await db.file.findUnique({
    where: { id: fileId },
    select: { id: true, url: true },
  });

  if (!foundFile) {
    logger.error(logMeta, "No file found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "File Not Found.",
    });
  }

  res.status(200).json(
    apiUtils.formatApiResponse({
      data: foundFile,
      message: "File Found Successfully",
    })
  );
});

export const deleteFileByIdHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;
  const logMeta = {
    method: req.method,
    url: req.url,
    ip: req.ip,
    signedInId: req.user!.id,
  };
  logger.info(logMeta, "Request to delete file received.");
  const foundFile = await db.file.findUnique({
    where: { id: fileId },
    select: { id: true, url: true, uploaderId: true, key: true },
  });

  if (!foundFile) {
    logger.error(logMeta, "No file found.");
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "File Not Found.",
    });
  }
  if (foundFile.uploaderId !== req.user!.id || req.user!.role !== "ADMIN") {
    logger.error(logMeta, "Not authorized to delete file.");
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "Not allowed to delete another's file.",
    });
  }
  await fileUtils.deleteFile(foundFile.key);
  await db.file.delete({ where: { id: fileId } });
  res.status(200).json(
    apiUtils.formatApiResponse({
      message: "File deleted Successfully",
    })
  );
});

export default {
  deleteFileByIdHandler,
  getFileByIdHandler,
  uploadFileHandler,
};
