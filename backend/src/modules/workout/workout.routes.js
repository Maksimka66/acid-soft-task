import { Router } from 'express'
import { matchedData } from 'express-validator'
import { validation } from '../../middlewares/validationMiddleware.js'
import {
    getAllWorkouts,
    getOneWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
} from './workout.service.js'
import { addWorkoutToHistory } from '../history/history.service.js'
import {
    createWorkoutSchema,
    getOneWorkoutSchema,
    updateWorkoutSchema
} from '../../schemas/workoutSchemas.js'
import { addWorkoutToHistorySchema } from '../../schemas/addWorkoutToHistorySchema.js'

const workoutRouter = new Router()

workoutRouter.get('/', async (req, res, next) => {
    try {
        const { id } = req.user

        const workouts = await getAllWorkouts(id)

        return res.json(workouts)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.get('/:id', getOneWorkoutSchema, validation, async (req, res, next) => {
    try {
        const { id } = matchedData(req)

        const userId = req.user.id

        const workout = await getOneWorkout({ id, userId })

        return res.json(workout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.post('/', createWorkoutSchema, validation, async (req, res, next) => {
    try {
        const { name, description } = matchedData(req)

        const userId = req.user.id

        const newWorkout = await createWorkout({ userId, name, description })

        return res.status(201).json(newWorkout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.put('/:id', updateWorkoutSchema, validation, async (req, res, next) => {
    try {
        const { id, name, description } = matchedData(req)

        const userId = req.user.id

        const data = {
            name,
            description: description ? description : 'No description'
        }

        const updatedWorkout = await updateWorkout({ id, userId, data })

        return res.json(updatedWorkout)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.delete('/:id', getOneWorkoutSchema, validation, async (req, res, next) => {
    try {
        const { id } = matchedData(req)

        const userId = req.user.id

        const result = await deleteWorkout({ id, userId })

        return res.json(result)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

workoutRouter.post(
    '/:id/complete',
    addWorkoutToHistorySchema,
    validation,
    async (req, res, next) => {
        try {
            const { id } = matchedData(req)

            const userId = req.user.id

            const addedToHistory = await addWorkoutToHistory({ id, userId })

            return res.status(201).json(addedToHistory)
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
)

export default workoutRouter

