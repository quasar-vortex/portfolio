import { db } from "../db";
import { HttpError } from "../error";
import logger from "../logger";
import { AuthenticatedRequestHandler } from "../types";
import { deleteFileByKey, S3UploadedFile } from "../upload";
import { SearchFilesModel } from "./uploads.models";

type ExpressFile = S3UploadedFile & Express.Multer.File;

const baseSelect = { id: true, url: true, fileType: true };
const adminSelect = {
  ...baseSelect,
  isActive: true,
  objectKey: true,
  originalName: true,
  size: true,
  userId: true,
  dateUploaded: true,
  dateUpdated: true,
};
const uploadFileHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const userId = req.user!.id;
  const file = req.file as ExpressFile;
  const role = req.user!.role;
  const isAdmin = role == "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
  };
  logger.info(meta, "Uploading File!");
  let fileKey: null | string = null;
  try {
    if (!file) {
      throw new HttpError({
        status: "BAD_REQUEST",
        message: "Must include a file to upload.",
      });
    }
    const { key, location, size, originalname, mimetype } = file;

    fileKey = key;

    const dbFile = await db.file.create({
      data: {
        objectKey: key,
        url: location,
        size,
        originalName: originalname,
        fileType: "IMAGE",
        userId,
      },
      select: isAdmin ? adminSelect : baseSelect,
    });

    const message = "File has been uploaded";
    logger.info({ ...meta, fileId: dbFile.id }, message);
    res.status(201).json({ data: dbFile, message });
  } catch (error) {
    if (fileKey) await deleteFileByKey(fileKey);
    logger.warn({ error }, "Could not upload file");
    next(error);
  }
};

const deleteFileByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const fileId = req.params.fileId;
  const userId = req.user!.id;
  const role = req.user!.role;
  const isAdmin = role == "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
  };
  logger.info(meta, "Deleting File!");
  try {
    if (!isAdmin)
      throw new HttpError({
        status: "NOT_AUTHORIZED",
        message: "Must be an admin to delete a file.",
      });
    await db.file.update({
      where: { id: fileId },
      data: { isActive: false, updatedById: userId },
    });
    logger.info(meta, "File was deleted.");
    res.status(200).json({ message: "File was deleted!" });
  } catch (error) {
    logger.warn({ error }, "Unable to delete file");
    next(error);
  }
};

const getFileByIdHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const fileId = req.params.fileId;
  const userId = req.user!.id;
  const role = req.user!.role;
  const isAdmin = role == "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
  };
  logger.info(meta, "Finding File!");
  try {
    const where: { id: string; isActive?: boolean } = { id: fileId };
    if (!isAdmin) where.isActive = true;
    const foundFile = await db.file.findUnique({
      where,
      select: isAdmin ? adminSelect : baseSelect,
    });
    logger.info(meta, "File was found");
    res
      .status(200)
      .json({ data: foundFile, message: "Found file successfully!" });
  } catch (error) {
    logger.warn({ error }, "Unable to retrieve file");
    next(error);
  }
};

const getManyFilesHandler: AuthenticatedRequestHandler = async (
  req,
  res,
  next
) => {
  const userId = req.user!.id;
  const role = req.user!.role;
  const isAdmin = role == "ADMIN";
  const meta = {
    ip: req.ip,
    method: req.method,
    url: req.url,
    userId,
  };
  logger.info(meta, "Finding Files!");
  try {
    const {
      name,
      pageIndex = "0",
      pageSize = "10",
    } = req.query as unknown as SearchFilesModel;

    const trimmedTerm = name?.trim();
    const index = Math.max((parseInt(pageIndex, 10) || 1) - 1, 0);
    const size = Math.min(Math.max(parseInt(pageSize, 10) || 10, 1), 50);

    logger.info(
      { ...meta, term: trimmedTerm, pageIndex: index + 1, pageSize: size },
      "Searching for files."
    );

    const where: { originalName?: { contains: string }; isActive?: boolean } =
      {};

    if (trimmedTerm) where.originalName = { contains: trimmedTerm };
    if (!isAdmin) where.isActive = true;
    const select = isAdmin ? adminSelect : baseSelect;
    const count = await db.file.count({
      where,
      take: size,
      skip: index * size,
    });
    const foundFiles = await db.file.findMany({
      where,
      select,
      take: size,
      skip: index * size,
    });

    logger.info({ ...meta, count: count }, "Files found!");
    res.status(200).json({
      message: "Files found successfully!",
      data: foundFiles,
      meta: {
        pageSize: size,
        pageIndex: index + 1,
        totalPages: Math.ceil(count / size),
      },
    });
  } catch (error) {
    logger.warn({ error }, "Unable to retrieve files");
    next(error);
  }
};

export {
  uploadFileHandler,
  deleteFileByIdHandler,
  getFileByIdHandler,
  getManyFilesHandler,
};
