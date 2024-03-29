import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import route from "./apis/index.js";
import config from "./config/config.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());

route(app);

const PORT = config.port || 3001;

connectDB()
  .then(() => app.listen(PORT, () => console.log("App listen on port: ", PORT)))
  .catch((err) => console.log(err));
