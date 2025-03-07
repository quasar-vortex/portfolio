import { FileType } from "@prisma/client";
import { db } from "../db";
import HttpError from "../error";
import { userModels } from "../models";
import { apiUtils, asyncHandler, passUtils, jwtUtils } from "../utils";
import fileUtils from "../utils/fileUtils";
import { S3UploadedFile } from "../types";

const { selectUser } = userModels;
const { formatApiRespone } = apiUtils;
const { hashPass, verifyPass } = passUtils;
const { verifyUserToken, signUserToken } = jwtUtils;

const uploadFileController = asyncHandler(async (req, res, next) => {
  const file = req.file as unknown as S3UploadedFile | undefined;
  const userId = req.user!.id;
  let fileType: FileType = "IMAGE";

  // check if file uploaded
  if (!file)
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "No File Provided",
    });
  let mimeType = req.file!.mimetype.toLocaleLowerCase();
  // File Filter checks if image already currently in the multer setup, this is for future extension
  if (mimeType.includes("image")) fileType = "IMAGE";
  else if (mimeType.includes("video")) fileType = "VIDEO";
  else if (mimeType.includes("audio")) fileType = "AUDIO";
  else {
    // clean up s3 file
    await fileUtils.deleteFile(file.key);
    throw new HttpError({
      statusMessage: "BAD_REQUEST",
      message: "Inavlid File Type",
    });
  }

  // Upload to DB
  const {
    bucket,
    key,
    location,
    mimetype,
    originalname,
    size,
    location: url,
  } = file;
  const newFile = await db.file.create({
    data: { key, originalName: originalname, size, url, uploaderId: userId },
  });
});

export default {
  uploadFileController,
};
