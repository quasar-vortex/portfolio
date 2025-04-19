import pino from "pino";
import { NODE_ENV } from "./env";

const isProd = NODE_ENV === "production";
const level = isProd ? "info" : "debug";

export default pino({
  level,
  transport: isProd
    ? undefined // raw JSON in production
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      },
});
