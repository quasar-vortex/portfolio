"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Config = exports.JWT_REFRESH_SECRET = exports.JWT_ACCESS_SECRET = exports.CLEANUP_INTERVAL = exports.APP_PORT = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.NODE_ENV = process.env.NODE_ENV?.toLocaleLowerCase() ||
    "development";
exports.APP_PORT = parseInt(process.env.PORT || "5000");
exports.CLEANUP_INTERVAL = Number(process.env.CLEANUP_INTERVAL || "15m");
exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
exports.s3Config = {
    accessKey: process.env.OS_ACCESS_KEY,
    secretKey: process.env.OS_SECRET_KEY,
    bucketName: process.env.OS_BUCKET_NAME,
    endpoint: process.env.OS_ENDPOINT,
    region: process.env.OS_REGION,
};
