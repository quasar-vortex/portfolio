import { v4 as uuid } from "uuid";
import {
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import { s3Env } from "../env";

export type CustomFile = {};
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/webp",
  "image/png",
  "image/gif",
];

const s3 = new S3Client({
  credentials: {
    accessKeyId: s3Env.S3_ACCESS_KEY!,
    secretAccessKey: s3Env.S3_SECRET_KEY!,
  },
  region: s3Env.S3_REGION!,
  endpoint: s3Env.S3_ENDPOINT!,
  forcePathStyle: true,
});
const upload = multer({
  storage: multerS3({
    s3,
    bucket: s3Env.S3_BUCKET_NAME!,
    metadata(req, file, callback) {
      callback(null, { fieldName: file.fieldname });
    },
    key(req, file, callback) {
      callback(null, uuid() + "." + file.mimetype.split("/")[1]);
    },
  }),
  fileFilter(req, file, callback) {
    if (ACCEPTED_FILE_TYPES.includes(file.mimetype)) {
      callback(null, true);
    }
  },
});

const deleteFile = async (key: string) => {
  return await s3.send(
    new DeleteObjectCommand({ Bucket: s3Env.S3_BUCKET_NAME!, Key: key })
  );
};
const listFiles = async () => {
  return await s3.send(
    new ListObjectsCommand({ Bucket: s3Env.S3_BUCKET_NAME })
  );
};
export default {
  upload,
  s3,
  deleteFile,
  listFiles,
};
