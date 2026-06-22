import { Router } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createExerciseSchema, getAllExercisesSchema } from '../../schemas/exerciseSchema.js'
import { createExercise, getAllExercises, updateExercise } from './exercise.service.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

const exerciseRouter = new Router()

exerciseRouter.get('/', getAllExercisesSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { workoutId } = matchedData(req)

        const exercises = await getAllExercises(workoutId)

        return res.json(exercises)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.post('/', createExerciseSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { id, name, sets, reps, weight } = matchedData(req)

        const newExercise = await createExercise({ id, name, sets, reps, weight })

        return res.status(201).json(newExercise)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.put('/:id', async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { id, name, sets, reps, weight } = matchedData(req)

        const newExercise = await updateExercise({ id, name, sets, reps, weight })
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.delete('/:id', async (req, res, next) => {
    try {
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default exerciseRouter

