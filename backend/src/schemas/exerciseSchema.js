import { body, param } from 'express-validator'
import { trimReplace } from './schemaUtils.js'

export const getAllExercisesSchema = [
    param('workoutId').customSanitizer(trimReplace).notEmpty().withMessage('Id should not be empty')
]

export const createExerciseSchema = [
    param('id').customSanitizer(trimReplace).notEmpty().withMessage('Id should not be empty'),
    body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty'),
    body('sets').isInt().notEmpty(),
    body('reps').isInt().notEmpty(),
    body('weight').isInt().notEmpty()
]

// export const updateExerciseSchema = [
//     param('id').customSanitizer(trimReplace).notEmpty().withMessage('Id should not be empty'),
//     body('name').customSanitizer(trimReplace).notEmpty().withMessage('Name should not be empty'),
//     body('sets').isInt().notEmpty(),
//     body('reps').isInt().notEmpty(),
//     body('weight').isInt().notEmpty()
// ]

