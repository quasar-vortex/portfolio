import { configDotenv } from "dotenv";

configDotenv();
export { default as appEnv } from "./appEnv";
export { default as jwtEnv } from "./jwtEnv";
export { default as s3Env } from "./s3Env";
