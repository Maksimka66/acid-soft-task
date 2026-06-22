import { Router } from 'express'
import { matchedData } from 'express-validator'
import { validation } from '../../middlewares/validationMiddleware.js'
import { createExerciseSchema } from '../../schemas/exerciseSchema.js'
import {
    getAllExercises,
    getOneExercise,
    createExercise,
    updateExercise,
    deleteExercise
} from './exercise.service.js'

const exerciseRouter = new Router()

exerciseRouter.get('/', async (req, res, next) => {
    try {
        const { workoutId } = matchedData(req)

        const userId = req.user.id

        const exercises = await getAllExercises({ workoutId, userId })

        return res.json(exercises)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.get('/:id', async (req, res, next) => {
    try {
        const { id, workoutId } = matchedData(req)

        const userId = req.user.id

        const exercise = await getOneExercise({ id, workoutId, userId })

        return res.json(exercise)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.post('/', createExerciseSchema, validation, async (req, res, next) => {
    try {
        const { id, name, sets, reps, weight } = matchedData(req)

        const userId = req.user.id

        const newExercise = await createExercise({ id, userId, name, sets, reps, weight })

        return res.status(201).json(newExercise)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.put('/:id', validation, async (req, res, next) => {
    try {
        const { id, workoutId, name, sets, reps, weight } = matchedData(req)

        const userId = req.user.id

        const data = { name, sets, reps, weight }

        const updatedExercise = await updateExercise({ id, workoutId, userId, data })

        return res.json(updatedExercise)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

exerciseRouter.delete('/:id', validation, async (req, res, next) => {
    try {
        const { id, workoutId } = matchedData(req)
        const userId = req.user.id

        const result = await deleteExercise({ id, workoutId, userId })

        return res.json(result)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default exerciseRouter

