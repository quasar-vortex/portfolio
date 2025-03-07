import path from "path";
import pino from "pino";

// Need to rotate logs,logrotate on linux should be able to do this
const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: path.join(__dirname, `../logs/app.log`),
        },
      },
      {
        target: "pino-pretty",
        options: { colorize: true },
      },
    ],
  },
});

export default logger;
