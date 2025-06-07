"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./env");
const pino_http_1 = require("pino-http");
const logger_1 = __importDefault(require("./logger"));
const db_1 = require("./db");
const auth_1 = require("./auth");
const error_middleware_1 = require("./middleware/error.middleware");
const tags_routes_1 = require("./tags/tags.routes");
const posts_routes_1 = require("./posts/posts.routes");
const uploads_routes_1 = require("./uploads/uploads.routes");
const users_routes_1 = require("./users/users.routes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const projects_routes_1 = require("./projects/projects.routes");
const upload_1 = require("./upload");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, pino_http_1.pinoHttp)({ logger: logger_1.default }));
/*
for debugging requests to look at query, body or params as they come in the backend


*/
app.get("/api/v1/health", (req, res, next) => {
    res.sendStatus(200);
});
app.use("/api/v1/auth", auth_1.authRouter);
app.use("/api/v1/tags", tags_routes_1.tagsRouter);
app.use("/api/v1/posts", posts_routes_1.postsRouter);
app.use("/api/v1/uploads", uploads_routes_1.uploadsRouter);
app.use("/api/v1/users", users_routes_1.usersRouter);
app.use("/api/v1/projects", projects_routes_1.projectsRouter);
app.use(error_middleware_1.errorMiddleware);
/*
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

*/
const runInactiveRecordCleanUp = () => {
    setInterval(async () => {
        try {
            logger_1.default.info("Running Inactive Record Cleanup");
            await db_1.db.post.deleteMany({ where: { isActive: false } });
            await db_1.db.project.deleteMany({ where: { isActive: false } });
            const files = await db_1.db.file.findMany({ where: { isActive: false } });
            await Promise.all(files.map((item) => (0, upload_1.deleteFileByKey)(item.objectKey)));
            const f = await db_1.db.$queryRaw `
                  select f.id, f.objectKey
                  from File f
                  where f.id not in (select u.avatarFileId from User u)
                  and f.id not in (select p.coverImageId from Post p)
                  and f.id not in (select p.coverImageId from Project p)
    `;
            await Promise.all(f.map((item) => (0, upload_1.deleteFileByKey)(item.objectKey)));
            await db_1.db.file.deleteMany({
                where: {
                    OR: [
                        { id: { in: files.map((item) => item.id) } },
                        { id: { in: f.map((item) => item.id) } },
                    ],
                },
            });
            await db_1.db.user.deleteMany({ where: { isActive: false } });
            logger_1.default.info("Inactive Record Cleanup Completed");
        }
        catch (err) {
            logger_1.default.error("Error during Inactive Record Cleanup", err);
        }
    }, 1000 * 60 * env_1.CLEANUP_INTERVAL);
};
const main = async () => {
    try {
        await db_1.db.$connect();
        app.listen(env_1.APP_PORT, () => console.log(`Server Running On: ${env_1.APP_PORT}`));
        // could be set as a cron job but just passing env var
        logger_1.default.info(`Inactive record cleanup runs every ${env_1.CLEANUP_INTERVAL} minutes.`);
        runInactiveRecordCleanUp();
    }
    catch (error) {
        logger_1.default.error(error);
        process.exit(1);
    }
};
main();
