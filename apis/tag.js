import express from "express";
import { getAllTags } from "../controllers/tag.js";

const route = express.Router();

route.get("/", getAllTags);
export default route;
