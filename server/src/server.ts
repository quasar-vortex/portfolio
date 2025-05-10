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

import { projectsRouter } from "./projects/projects.routes";

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
app.use("/api/v1/projecs", projectsRouter);

app.use(errorMiddleware);

/* 
// Testing linode connection and creds
if (process.argv[2] === "test" || NODE_ENV === "development") {
  const testFile = {
    key: "fcb61e32-a326-4a9c-890a-b75acb0d70d3",
    path: path.join(__dirname, "images.jpeg"),
  };
  const fileTest = async () => {
    try {
      // find the file
      const foundFile = await s3.send(
        new GetObjectCommand({ Key: testFile.key, Bucket: s3Config.bucketName })
      );
      if (foundFile) await deleteFileByKey(testFile.key);
      console.log("Removed uploaded file");
    } catch (error) {
      console.log(error);
      // if not found upload a file
      const f = await readFile(testFile.path);

      const uploaded = await s3.send(
        new PutObjectCommand({
          Body: f,
          Key: testFile.key,
          Bucket: s3Config.bucketName,
          ACL: "public-read",
          ContentType: "image/jpeg",
        })
      );
      console.log("Uploaded file");
    }
  };
  fileTest();
}

*/
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
