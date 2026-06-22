import bcrypt from 'bcrypt'
import { User } from './user.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'
import { generateTokens } from './user.utils.js'

export async function signUpUser({ username, email, password }) {
    const potentialUser = await User.findOne({ where: { email } })

    if (potentialUser) {
        throw CustomError.badRequest('There`s already a user with such email!')
    }

    const hashedPassword = await bcrypt.hash(password, 5)

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    })

    const { accessToken, refreshToken } = generateTokens({
        id: newUser.id,
        email
    })

    newUser.refreshToken = refreshToken

    await newUser.save()

    return {
        id: newUser.id,
        accessToken,
        refreshToken,
        username,
        email,
        updatedAt: newUser.updatedAt,
        createdAt: newUser.createdAt
    }
}

export async function signInUser({ email, password }) {
    const user = await User.findOne({ where: { email } })

    if (!user) {
        throw CustomError.badRequest('Wrong input data!')
    }

    const comparedPasswords = await bcrypt.compare(password, user.password)

    if (!comparedPasswords) {
        throw CustomError.badRequest('Wrong input data!')
    }

    const { accessToken, refreshToken } = generateTokens({
        id: user.id,
        email
    })

    user.refreshToken = refreshToken

    await user.save()

    return {
        id: user.id,
        accessToken,
        refreshToken,
        username: user.username,
        email,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

export async function logoutUser({ refreshToken }) {
    if (!refreshToken) {
        throw CustomError.unauthorized()
    }

    const user = await User.findOne({ where: { refreshToken } })

    if (!user) {
        throw CustomError.badRequest('No such user!')
    }

    if (user.refreshToken !== refreshToken) {
        throw CustomError.unauthorized()
    }

    await user.update({
        refreshToken: null
    })

    return {
        message: 'Successful logout!'
    }
}

export async function setNewRefreshToken(refreshToken) {
    if (!refreshToken) {
        throw CustomError.unauthorized()
    }

    const user = await User.findOne({ where: { refreshToken } })

    if (!user) {
        throw CustomError.badRequest()
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
        id: user.id,
        email: user.email
    })

    user.refreshToken = newRefreshToken

    await user.save()

    return {
        id: user.id,
        accessToken,
        refreshToken: newRefreshToken,
        username: user.username,
        email: user.email,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    }
}

