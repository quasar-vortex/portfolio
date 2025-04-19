import express from "express";
import cors from "cors";
import { APP_PORT } from "./env";
import { pinoHttp } from "pino-http";
import logger from "./logger";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/api/v1/health", (req, res, next) => {
  res.sendStatus(200);
});

const main = async () => {
  app.listen(APP_PORT, () => console.log(`Server Running On: ${APP_PORT}`));
};

main();
