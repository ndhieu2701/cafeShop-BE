import express from "express"
import { emailReset, login, register, resetCode, resetPass } from "../controllers/userController.js"

const route = express.Router()

route.post("/register", register)
route.post("/login", login)
route.post("/emailReset", emailReset)
route.post("/resetCode", resetCode)
route.post("/resetPass", resetPass)

export default route