import express from "express";
import { appEnv } from "./env";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, userRouter } from "./routes";
import { errorMiddleware } from "./middlware";
import { apiUtils } from "./utils";
import { db } from "./db";
import filesRouter from "./routes/fileRoutes";

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(cookieParser());

app.get("/api/v1/health", (req, res, next) => {
  res
    .status(200)
    .json(apiUtils.formatApiRespone(null, 200, "Health Check Passed"));
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/files", filesRouter);
app.use(errorMiddleware);

// Only start if not running integration tests
if (appEnv.NODE_ENV.toLocaleLowerCase() !== "test") {
  const main = async () => {
    // Connect to the database. If it fails, exit the application
    try {
      console.log("Connecting Database");
      await db.$connect();
    } catch (error) {
      console.warn("Unable to Connect to Database");
      console.error(error);
      process.exit(1);
    }
    // Start the HTTP server. If it fails, exit the application
    try {
      app.listen(appEnv.PORT, () =>
        console.log(`API Server Running On: ${appEnv.PORT}`)
      );
    } catch (error) {
      console.warn("Unable to Start HTTP Server");
      console.error(error);
      process.exit(1);
    }
  };
  main();
}

export default app;
