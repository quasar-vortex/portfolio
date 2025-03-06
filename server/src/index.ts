import express from "express";
import { NODE_ENV, PORT } from "./env";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, userRouter } from "./routes";
import { errorMiddleware } from "./middlware";
import { apiUtils } from "./utils";
import { db } from "./db";

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
app.use(errorMiddleware);

if (NODE_ENV.toLocaleLowerCase() !== "test") {
  const main = async () => {
    try {
      console.log("Connecting Database");
      await db.$connect();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
    app.listen(PORT, () => console.log(`API Server Running On: ${PORT}`));
  };
  main();
}

export default app;
