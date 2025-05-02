import express from "express";
import cors from "cors";
import { APP_PORT } from "./env";
import { pinoHttp } from "pino-http";
import logger from "./logger";
import { db } from "./db";
import { authRouter } from "./auth";
import { errorMiddleware } from "./middleware/error.middleware";
import { tagsRouter } from "./tags/tags.routes";
import { postsRouter } from "./posts/posts.routes";
import { uploadsRouter } from "./uploads/uploads.routes";
import { usersRouter } from "./users/users.routes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/api/v1/health", (req, res, next) => {
  res.sendStatus(200);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/uploads", uploadsRouter);
app.use("/api/v1/users", usersRouter);

app.use(errorMiddleware);

const main = async () => {
  try {
    await db.$connect();

    app.listen(APP_PORT, () => console.log(`Server Running On: ${APP_PORT}`));
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

main();
