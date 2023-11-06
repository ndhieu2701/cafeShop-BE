import express from "express"
import { createOrder } from "../controllers/orderController.js"
const route = express.Router()

route.post('/create', createOrder)

export default route