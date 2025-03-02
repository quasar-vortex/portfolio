import express from "express";
import { PORT } from "./env";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const main = async () => {
  app.listen(PORT, () => console.log(`Server Running On: ${PORT}`));
};
main();
