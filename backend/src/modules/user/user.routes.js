import { Router } from 'express'
import { matchedData } from 'express-validator'
import { signUpUser, signInUser, logoutUser, setNewRefreshToken } from './user.service.js'
import authHandler from '../../middlewares/authMiddleware.js'
import { validation } from '../../middlewares/validationMiddleware.js'
import { signInSchema } from '../../schemas/signInSchema.js'
import { signUpSchema } from '../../schemas/signUpSchema.js'
import { logoutSchema } from '../../schemas/logoutSchema.js'
import { refreshSchema } from '../../schemas/refreshSchema.js'
import { validateToken } from './user.utils.js'

const userRouter = new Router()

userRouter.post('/signup', signUpSchema, validation, async (req, res, next) => {
    try {
        const { username, email, password } = matchedData(req)

        const createdUser = await signUpUser({ username, email, password })

        res.cookie('refreshToken', createdUser.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.status(201).json(createdUser)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/signin', signInSchema, validation, async (req, res, next) => {
    try {
        const { email, password } = matchedData(req)

        const user = await signInUser({ email, password })

        res.cookie('refreshToken', user.refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.json(user)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/logout', authHandler, logoutSchema, validation, async (req, res, next) => {
    try {
        const { refreshToken } = matchedData(req)

        const result = await logoutUser({ refreshToken })

        res.clearCookie('refreshToken')

        return res.json(result)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/refresh', authHandler, refreshSchema, validation, async (req, res, next) => {
    try {
        const { refreshToken } = matchedData(req)

        validateToken(refreshToken, process.env.JWT_REFRESH_KEY)

        const user = await setNewRefreshToken(refreshToken)

        res.cookie('refreshToken', refreshToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        return res.json(user)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default userRouter

