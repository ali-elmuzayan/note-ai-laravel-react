import { config } from "../config/env"
import { ObjectId } from "mongoose"
import jwt from "jsonwebtoken"

export const createToken = (userId: ObjectId) => {
    const token = jwt.sign({id: userId}, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn
    })
    return token
}

const authService = {
    createToken
}

export default authService