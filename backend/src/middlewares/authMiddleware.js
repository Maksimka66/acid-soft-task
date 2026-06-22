import { CustomError } from '../errorHandlers/apiErrors.js'
import { validateToken } from '../modules/user/user.utils.js'

function authHandler(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        const accessToken = authHeader.split(' ')[1]

        if (!authHeader || !accessToken) {
            return next(CustomError.unauthorized())
        }

        const payload = validateToken(accessToken, process.env.JWT_ACCESS_KEY)

        if (!payload) {
            return next(CustomError.unauthorized())
        }

        req.user = payload

        return next()
    } catch (e) {
        return next(CustomError.unauthorized())
    }
}

export default authHandler

