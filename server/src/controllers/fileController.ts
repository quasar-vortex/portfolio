import { FileType } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { apiUtils, asyncHandler } from "../utils";
import fileUtils from "../utils/fileUtils";
import { S3UploadedFile } from "../types";
import { QueryFileModel } from "../models/fileModels";

const { formatApiRespone } = apiUtils;

const uploadFileHandler = asyncHandler(async (req, res, next) => {
  const file = req.file as unknown as S3UploadedFile | undefined;
  const userId = req.user!.id;
  let fileType: FileType = "IMAGE";

  // check if file uploaded
  if (!file) {
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File Provided",
    });
  }
  let mimeType = file.mimetype.toLocaleLowerCase();
  // File Filter checks if image already currently in the multer setup, this is for future extension
  if (mimeType.includes("image")) fileType = "IMAGE";
  else if (mimeType.includes("video")) fileType = "VIDEO";
  else if (mimeType.includes("audio")) fileType = "AUDIO";
  else {
    // clean up s3 file
    await fileUtils.deleteFile(file.key);
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Invalid File Type",
    });
  }

  // Upload to DB
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

  // Send to user
  res.status(201).json(formatApiRespone(newFile, 201, "File Uploaded"));
});

const deleteFileByIdHandler = asyncHandler(async (req, res, next) => {
  const userId = req.user!.id;
  const fileId = req.params.fileId;
  const foundFile = await db.file.findUnique({ where: { id: fileId } });

  // Check if file exists
  if (!foundFile)
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File to Delete",
    });
  // Verify ownership
  if (foundFile.uploaderId !== userId)
    throw new HttpError({
      statusMessage: "FORBIDDEN",
      message: "May not delete another's files.",
    });
  // Remove from s3 bucket
  await fileUtils.deleteFile(foundFile.key);
  // Remove database record
  await db.file.delete({ where: { id: fileId, uploaderId: userId } });

  // Send response to user
  res.status(201).json(formatApiRespone(null, 200, "File Deleted"));
});

const getFileByIdHandler = asyncHandler(async (req, res, next) => {
  const fileId = req.params.fileId;
  const foundFile = await db.file.findUnique({ where: { id: fileId } });
  // Check if file exists
  if (!foundFile)
    throw new HttpError({
      statusMessage: "NOT_FOUND",
      message: "No File Found",
    });
  res
    .status(200)
    .json(formatApiRespone(foundFile, 200, "Found File Successfully."));
});

const getManyFilesHandler = asyncHandler(async (req, res, next) => {
  const { pageIndex, pageSize, searchTerm } = req.query as QueryFileModel;

  let take = parseInt(pageSize || "10");
  let skip = parseInt(pageIndex || "0") * take;

  // Ensure pagination values are within valid ranges
  if (Number.isNaN(skip) || skip < 0) skip = 0;
  if (Number.isNaN(take) || take < 10) take = 10;
  if (take > 50) take = 50;

  // mysql search with varchar is case insenstive by default
  const trimmedSearch = searchTerm?.trim();

  const where = trimmedSearch
    ? {
        originalName: { contains: trimmedSearch },
      }
    : {};

  // Fetch paginated files and total count
  const [foundFiles, totalFiles] = await Promise.all([
    db.file.findMany({
      skip,
      where,
      take,
    }),
    db.file.count({ where }),
  ]);

  const totalPages = Math.ceil(totalFiles / take);
  const currentPage = Math.floor(skip / take) + 1; // Convert to 1-based index

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

  // Ensure pagination values are within valid ranges
  if (Number.isNaN(skip) || skip < 0) skip = 0;
  if (Number.isNaN(take) || take < 10) take = 10;
  if (take > 50) take = 50;

  // mysql search with varchar is case insenstive by default
  const trimmedSearch = searchTerm?.trim();

  const where = trimmedSearch
    ? {
        originalName: { contains: trimmedSearch },
        uploaderId: userId,
      }
    : { uploaderId: userId };

  // Fetch paginated files and total count
  const [foundFiles, totalFiles] = await Promise.all([
    db.file.findMany({
      skip,
      where,
      take,
    }),
    db.file.count({ where }),
  ]);

  const totalPages = Math.ceil(totalFiles / take);
  const currentPage = Math.floor(skip / take) + 1; // Convert to 1-based index

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
};
