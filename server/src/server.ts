import express from "express";
import cors from "cors";
import { APP_PORT, CLEANUP_INTERVAL } from "./env";
import { pinoHttp } from "pino-http";
import logger from "./logger";
import { db } from "./db";
import { authRouter } from "./auth";
import { errorMiddleware } from "./middleware/error.middleware";
import { tagsRouter } from "./tags/tags.routes";
import { postsRouter } from "./posts/posts.routes";
import { uploadsRouter } from "./uploads/uploads.routes";
import { usersRouter } from "./users/users.routes";
import cookieParser from "cookie-parser";
import { projectsRouter } from "./projects/projects.routes";
import { deleteFileByKey, listAllFiles, s3 } from "./upload";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(pinoHttp({ logger }));

/* 
for debugging requests to look at query, body or params as they come in the backend


*/

app.get("/api/v1/health", (req, res, next) => {
  res.sendStatus(200);
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/posts", postsRouter);
app.use("/api/v1/uploads", uploadsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/projects", projectsRouter);

app.use(errorMiddleware);

const cleanUpFiles = async () => {
  try {
    logger.info("Cleaning Up Files");
    const foundFiles = await listAllFiles();
    const fileKeys = foundFiles.Contents?.map((item) => {
      return item.Key;
    });
    if (fileKeys) {
      await Promise.all(
        fileKeys!.map(async (item) => {
          return await deleteFileByKey(item!);
        })
      );
    }
    logger.info("Finished Cleaning Up Files");
  } catch (error) {
    logger.warn("Unable to clean up files");
  }
};
const main = async () => {
  try {
    await db.$connect();

    app.listen(APP_PORT, () => console.log(`Server Running On: ${APP_PORT}`));

    // could be set as a cron job but just passing env var
    logger.info(
      `Inactive record cleanup runs every ${CLEANUP_INTERVAL} minutes.`
    );
    setInterval(async () => {
      logger.info("Running Inactive Record Cleanup");
      // find files older than x minutes with no record link
      // tags delete on cascade for projects and posts
      await db.post.deleteMany({ where: { isActive: false } });
      await db.project.deleteMany({
        where: { isActive: false },
      });
      // find files, delete from s3 and then DB
      const files = await db.file.findMany({ where: { isActive: false } });
      await Promise.all(
        files.map(async (item) => {
          return await deleteFileByKey(item.objectKey);
        })
      );
      await db.file.deleteMany({
        where: { id: { in: files.map((item) => item.id) } },
      });
      // clean up inactive users
      await db.user.deleteMany({ where: { isActive: false } });

      logger.info("Inactive Record Cleanup Completed");
      // runs every 15 minutes default
    }, 1000 * 60 * CLEANUP_INTERVAL);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

main();
