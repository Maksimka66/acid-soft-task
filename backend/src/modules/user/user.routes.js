import { Router } from 'express'
import { matchedData, validationResult } from 'express-validator'
import UserService from './user.service.js'
import signInSchema from '../../schemas/signInSchema.js'
import signUpSchema from '../../schemas/signUpSchema.js'
import { logoutSchema } from '../../schemas/logoutSchema.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

const userRouter = new Router()

const { findUser, signUpUser, signInUser } = UserService

userRouter.post('/signup', signUpSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { username, email, password } = matchedData(req)

        const createdUser = await signUpUser(username, email, password)

        return res.status(201).json(createdUser)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.post('/signin', signInSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

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

userRouter.post('/logout', logoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { refreshToken } = matchedData(req)

        res.clearCookie('refreshToken')

        return res.json(refreshToken)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

userRouter.get('/refresh', async (req, res, next) => {
    try {
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default userRouter

