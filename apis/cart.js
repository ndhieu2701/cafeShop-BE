import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import { getUserCart, updateCart } from "../controllers/cartController.js"
const route = express.Router()

route.put("/update", verifyToken, updateCart)
route.get("/", verifyToken, getUserCart)
export default route