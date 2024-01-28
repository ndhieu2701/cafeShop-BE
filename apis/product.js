import express from "express";
import upload from "../middleware/multer.js";
import {
  createProduct,
  getProduct,
  getFilterProduct,
  getMinMaxPrice,
  createReview,
} from "../controllers/productController.js";

const route = express.Router();

route.post("/", upload.single("image"), createProduct);
route.get("/:id", getProduct)
route.get("/price", getMinMaxPrice);
route.get("/", getFilterProduct);
route.post("/review", createReview)

export default route;
