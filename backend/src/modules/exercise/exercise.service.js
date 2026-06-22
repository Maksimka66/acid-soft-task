import { Exercise } from './exercise.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function getAllExercises(workoutId) {
    const exercises = await Exercise.findAll({
        where: {
            workoutId
        }
    })

    return exercises
}

export async function getOneExercise(id) {
    const exercise = await Exercise.findOne({
        where: {
            id
        }
    })

    if (!exercise) {
        throw CustomError.badRequest('No such exercises!')
    }

    return exercise
}

export async function createExercise({ workoutId, name, sets, reps, weight }) {
    const newExercise = await Exercise.create({
        workoutId,
        name,
        sets,
        reps,
        weight
    })

    return newExercise
}

export async function updateExercise(params) {}

