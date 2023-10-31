import express from "express";
import upload from "../middleware/multer.js";
import {
  createProduct,
  //  getAllProduct,
  getFilterProduct,
  getMinMaxPrice,
} from "../controllers/productController.js";

const route = express.Router();

route.post("/", upload.single("image"), createProduct);
// route.get("/", getAllProduct)
route.get("/price", getMinMaxPrice);
route.get("/", getFilterProduct);

export default route;
