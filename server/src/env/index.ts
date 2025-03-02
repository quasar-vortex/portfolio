import dotenv from "dotenv";
import * as JWT from "./jwtEnv";

dotenv.config();

export const PORT = process.env.PORT as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export default {
  ...JWT,
  PORT,
  NODE_ENV,
};
