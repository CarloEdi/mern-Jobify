import { UnauthenticatedError } from "../errors/index.js"
import jwt from "jsonwebtoken"

const authenticateUser = async(req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token
    if(!token) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        payload.testUser = payload.userId === '642486c968fcbd6d5d4e7f24'
        req.user = payload
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid')
    }
}

export default authenticateUser