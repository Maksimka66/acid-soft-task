import bcrypt from 'bcrypt'
import { User } from './user.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'
import { generateTokens } from './user.utils.js'

class UserService {
    findUser = async (email) => {
        const user = await User.findOne({
            where: {
                email
            }
        })

        return user
    }

    signUpUser = async (username, email, password) => {
        const potentialUser = await this.findUser(email)

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

    signInUser = async ({ email, password }) => {
        const user = await this.findUser(email)

        if (!user) {
            throw CustomError.badRequest('No user with such email!')
        }

        const comparedPasswords = await bcrypt.compare(password, user.password)

        if (!comparedPasswords) {
            throw CustomError.badRequest('Uncorrect password!')
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
}

export default new UserService()

