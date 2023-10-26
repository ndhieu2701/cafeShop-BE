import express from "express";
import upload from "../middleware/multer.js";
import { createProduct } from "../controllers/productController.js";

const route = express.Router();

route.post("/", upload.single("image"), createProduct);

export default route;
