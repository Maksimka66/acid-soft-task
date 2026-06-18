import { Router } from 'express'
import { matchedData, validationResult } from 'express-validator'
import WorkoutService from './workout.service.js'
import {
    createWorkoutSchema,
    getOneWorkoutSchema,
    updateWorkoutSchema
} from '../../schemas/workoutSchemas.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

const workoutRouter = new Router()

const { getAllWorkouts, getOneWorkout, createWorkout, updateWorkout, deleteWorkout } =
    WorkoutService

workoutRouter.get('/', async (req, res, next) => {
    try {
        const workouts = await getAllWorkouts()

        return res.json(workouts)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.get('/:id', getOneWorkoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { id } = matchedData(req)

        const workout = await getOneWorkout(id)

        return res.json(workout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.post('/', createWorkoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { name, description } = matchedData(req)

        const userId = req.user.id

        const newWorkout = await createWorkout({ userId, name, description })

        return res.status(201).json(newWorkout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.put('/:id', updateWorkoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { id, name, description } = matchedData(req)

        const data = {
            name,
            description: description ? description : 'No description'
        }

        const updatedWorkout = await updateWorkout({ id, data })

        return res.json(updatedWorkout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.delete('/:id', getOneWorkoutSchema, async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return next(CustomError.badRequest('Validation error!', errors.array()))
        }

        const { id } = matchedData(req)

        await deleteWorkout(id)

        return res.json({
            message: 'Deleted'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.post('/:id/complete', async (req, res, next) => {
    try {
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default workoutRouter

