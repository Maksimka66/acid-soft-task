import { body, param } from 'express-validator'
import { trimReplace } from './schemaUtils.js'

export const getOneWorkoutSchema = [
    param('id').customSanitizer(trimReplace).notEmpty().withMessage('Id should not be empty')
]

export const createWorkoutSchema = [
    body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty')
]

export const updateWorkoutSchema = [
    param('id').customSanitizer(trimReplace).notEmpty().withMessage('Id should not be empty'),
    body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty')
]

