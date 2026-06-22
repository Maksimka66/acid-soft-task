import { param } from 'express-validator'

export const addWorkoutToHistorySchema = [
    param('id').notEmpty().withMessage('Id should not be empty')
]

