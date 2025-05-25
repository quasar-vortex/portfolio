import { v4 as uuid } from "uuid";
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from "@aws-sdk/client-s3";
import { s3Config } from "./env";
import multer from "multer";
import ms3 from "multer-s3";
import { HttpError } from "./error";
import logger from "./logger";

const fileTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
type S3UploadedFile = {
  size: number; // Size in bytes
  bucket: string;
  key: string;
  acl: string;
  contentType: string;
  metadata: Record<string, string>; // or Record<string, any>, field and mime currently
  location: string;
  etag: string;
  contentDisposition: string;
  storageClass: string;
  versionId?: string; // optional
  contentEncoding: string;
};

const s3 = new S3Client({
  credentials: {
    accessKeyId: s3Config.accessKey,
    secretAccessKey: s3Config.secretKey,
  },
  endpoint: s3Config.endpoint,
  region: s3Config.region,
  forcePathStyle: true,
});

const upload = multer({
  storage: ms3({
    s3,
    bucket: s3Config.bucketName,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname, mimeType: file.mimetype });
    },
    key: (req, file, cb) => {
      cb(null, uuid());
    },
    acl: "public-read",
    contentType(req, file, callback) {
      callback(null, file.mimetype);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (fileTypes.includes(file.mimetype)) return cb(null, true);
    cb(
      new HttpError({
        status: "BAD_REQUEST",
        message:
          "Invalid file type, not supported. Use one of the following - " +
          fileTypes.join("|"),
      })
    );
  },
});

const listAllFiles = async () => {
  try {
    logger.info("Listing s3 files.");
    return await s3.send(
      new ListObjectsV2Command({ Bucket: s3Config.bucketName })
    );
  } catch (error) {
    logger.warn({ error }, "Unable to list s3 files.");
    throw error;
  }
};

const deleteFileByKey = async (key: string) => {
  try {
    logger.info({ key }, "Deleting file.");
    return await s3.send(
      new DeleteObjectCommand({ Bucket: s3Config.bucketName, Key: key })
    );
  } catch (error) {
    logger.warn({ error }, "Unable to delete s3 file.");
    throw error;
  }
};

const getFileByKey = async (key: string) => {
  try {
    logger.info({ key }, "Finding file.");
    return await s3.send(
      new GetObjectCommand({ Bucket: s3Config.bucketName, Key: key })
    );
  } catch (error) {
    logger.warn({ error }, "Unable to delete s3 file.");
    throw error;
  }
};

export {
  s3,
  upload,
  S3UploadedFile,
  listAllFiles,
  deleteFileByKey,
  getFileByKey,
  fileTypes,
};
