import { Workout } from './workout.model.js'
import { Exercise } from '../exercise/exercise.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function getAllWorkouts({ userId, limit, offset }) {
    const workouts = await Workout.findAndCountAll({ where: { userId }, limit, offset })

    return workouts
}

export async function getOneWorkout({ id, userId }) {
    const workout = await Workout.findOne({
        where: { id, userId },
        include: [Exercise]
    })

    if (!workout) {
        throw CustomError.badRequest('No such workouts!')
    }

    return workout
}

export async function createWorkout({ userId, name, description }) {
    const newWorkout = await Workout.create({
        userId,
        name,
        description: description ? description : 'No description'
    })

    return newWorkout
}

export async function updateWorkout({ id, userId, data }) {
    const workout = await getOneWorkout({ id, userId })

    if (!workout) {
        throw CustomError.badRequest('No such workouts!')
    }

    await workout.update(data)

    return workout
}

export async function deleteWorkout({ id, userId }) {
    const workout = await getOneWorkout({ id, userId })

    if (workout) {
        await workout.destroy()

        return workout
    }
}

