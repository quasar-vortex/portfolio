import express from "express";
import { appEnv } from "./env";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, filesRouter, postsRouter, userRouter } from "./routes";
import { errorMiddleware } from "./middleware";
import { apiUtils } from "./utils";
import { db } from "./db";
import logger from "./logger";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());

// Health Check
app.get(`/api/${appEnv.API_VERSION}/health`, (req, res, next) => {
  res
    .status(200)
    .json(apiUtils.formatApiResponse({ message: "Health Check Passed!" }));
});
// Routes
app.use(`/api/${appEnv.API_VERSION}/auth`, authRouter);
app.use(`/api/${appEnv.API_VERSION}/users`, userRouter);
app.use(`/api/${appEnv.API_VERSION}/uploads`, filesRouter);
app.use(`/api/${appEnv.API_VERSION}/posts`, postsRouter);

// Catch All Error Handler (if no custom http error)
app.use(errorMiddleware);

// Only start if not running integration tests
if (appEnv.NODE_ENV.toLocaleLowerCase() !== "test") {
  const main = async () => {
    logger.info("Starting The Application");
    // Connect to the database. If it fails, exit the application
    try {
      logger.info("Connecting to Database");
      await db.$connect();
    } catch (error) {
      logger.error("Failed to Connect to Database");
      logger.error(error);
      process.exit(1);
    }
    // Start the HTTP server. If it fails, exit the application
    try {
      app.listen(appEnv.PORT, () =>
        logger.info(`API Server Running On: ${appEnv.PORT}`)
      );
    } catch (error) {
      logger.error("Unable to Start API Server");
      logger.error(error);
      process.exit(1);
    }
  };
  main();
}

export default app;
