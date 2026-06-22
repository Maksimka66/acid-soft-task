import { body, param } from 'express-validator'
import { trimReplace } from './schemaUtils.js'

export const getAllExercisesSchema = [param('id').notEmpty().withMessage('Id should not be empty')]

export const createExerciseSchema = [
    param('id').notEmpty().withMessage('Id should not be empty'),
    body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty'),
    body('sets').isInt({ min: 1 }).withMessage('Sets must be greater than 0'),
    body('reps').isInt({ min: 1 }).withMessage('Reps must be greater than 0'),
    body('weight').isFloat({ min: 0 }).withMessage('Weight cannot be negative')
]

export const updateExerciseSchema = [
    param('id').notEmpty().withMessage('Id should not be empty'),
    body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty'),
    body('sets').isInt({ min: 1 }).withMessage('Sets must be greater than 0'),
    body('reps').isInt({ min: 1 }).withMessage('Reps must be greater than 0'),
    body('weight').isFloat({ min: 0.5 }).withMessage('Weight cannot be negative')
]

