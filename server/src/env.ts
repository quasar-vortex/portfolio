import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV =
  (process.env.NODE_ENV?.toLocaleLowerCase() as "production" | "development") ||
  "development";

export const IS_FIRST_RUN =
  process.env.IS_FIRST_RUN?.toLocaleLowerCase() === "yes" || false;
export const APP_PORT = parseInt((process.env.PORT as string) || "5000");
export const CLEANUP_INTERVAL = Number(process.env.CLEANUP_INTERVAL || "15m");
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET as string;
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const s3Config = {
  accessKey: process.env.OS_ACCESS_KEY as string,
  secretKey: process.env.OS_SECRET_KEY as string,
  bucketName: process.env.OS_BUCKET_NAME as string,
  endpoint: process.env.OS_ENDPOINT as string,
  region: process.env.OS_REGION as string,
};
