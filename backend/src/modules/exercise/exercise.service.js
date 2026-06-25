import { Exercise } from './exercise.model.js'
import { Workout } from '../workout/workout.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function getAllExercises({ workoutId, userId }) {
    const workout = await Workout.findOne({ where: { id: workoutId, userId } })

    if (!workout) {
        throw CustomError.notFound('No such workout!')
    }

    const exercises = await Exercise.findAll({ where: { workoutId } })

    return exercises
}

export async function getOneExercise({ id, workoutId, userId }) {
    const workout = await Workout.findOne({ where: { id: workoutId, userId } })

    if (!workout) {
        throw CustomError.notFound('No such workout!')
    }

    const exercise = await Exercise.findOne({ where: { id, workoutId } })

    if (!exercise) {
        throw CustomError.notFound('No such exercise!')
    }

    return exercise
}

export async function createExercise({ id, userId, name, sets, reps, weight }) {
    const workout = await Workout.findOne({ where: { id, userId } })

    if (!workout) {
        throw CustomError.notFound('No such workout!')
    }

    const newExercise = await Exercise.create({
        workoutId: id,
        name,
        sets,
        reps,
        weight
    })

    return newExercise
}

export async function updateExercise({ id, workoutId, userId, data }) {
    const exercise = await getOneExercise({ id, workoutId, userId })

    await exercise.update(data)

    return exercise
}

export async function deleteExercise({ id, workoutId, userId }) {
    const exercise = await getOneExercise({ id, workoutId, userId })

    await exercise.destroy()

    return exercise
}

