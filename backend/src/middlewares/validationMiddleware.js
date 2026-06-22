import { validationResult } from 'express-validator'
import { CustomError } from '../errorHandlers/apiErrors.js'

export function validation(req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return next(CustomError.badRequest('Validation error!', errors.array()))
    }

    return next()
}

