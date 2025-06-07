"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTypes = exports.getFileByKey = exports.deleteFileByKey = exports.listAllFiles = exports.upload = exports.s3 = void 0;
const uuid_1 = require("uuid");
const client_s3_1 = require("@aws-sdk/client-s3");
const env_1 = require("./env");
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const error_1 = require("./error");
const logger_1 = __importDefault(require("./logger"));
const fileTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
exports.fileTypes = fileTypes;
const s3 = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: env_1.s3Config.accessKey,
        secretAccessKey: env_1.s3Config.secretKey,
    },
    endpoint: env_1.s3Config.endpoint,
    region: env_1.s3Config.region,
    forcePathStyle: true,
});
exports.s3 = s3;
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3,
        bucket: env_1.s3Config.bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname, mimeType: file.mimetype });
        },
        key: (req, file, cb) => {
            cb(null, (0, uuid_1.v4)());
        },
        acl: "public-read",
        contentType(req, file, callback) {
            callback(null, file.mimetype);
        },
    }),
    fileFilter: (req, file, cb) => {
        if (fileTypes.includes(file.mimetype))
            return cb(null, true);
        cb(new error_1.HttpError({
            status: "BAD_REQUEST",
            message: "Invalid file type, not supported. Use one of the following - " +
                fileTypes.join("|"),
        }));
    },
});
exports.upload = upload;
const listAllFiles = async () => {
    try {
        logger_1.default.info("Listing s3 files.");
        return await s3.send(new client_s3_1.ListObjectsV2Command({ Bucket: env_1.s3Config.bucketName }));
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to list s3 files.");
        throw error;
    }
};
exports.listAllFiles = listAllFiles;
const deleteFileByKey = async (key) => {
    try {
        logger_1.default.info({ key }, "Deleting file.");
        return await s3.send(new client_s3_1.DeleteObjectCommand({ Bucket: env_1.s3Config.bucketName, Key: key }));
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to delete s3 file.");
        throw error;
    }
};
exports.deleteFileByKey = deleteFileByKey;
const getFileByKey = async (key) => {
    try {
        logger_1.default.info({ key }, "Finding file.");
        return await s3.send(new client_s3_1.GetObjectCommand({ Bucket: env_1.s3Config.bucketName, Key: key }));
    }
    catch (error) {
        logger_1.default.warn({ error }, "Unable to delete s3 file.");
        throw error;
    }
};
exports.getFileByKey = getFileByKey;
