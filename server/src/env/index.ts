import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT as string;
const NODE_ENV = process.env.NODE_ENV as string;
export { PORT, NODE_ENV };
export { default as jwtEnv } from "./jwtEnv";
