import jwt from "jsonwebtoken"
import config from "./config.js"

const generateToken = (id) => {
    return jwt.sign({id}, config.jwtSecret)
}

export default generateToken