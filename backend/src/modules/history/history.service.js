import { History } from './history.model.js'
import { Workout } from '../workout/workout.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

export async function getHistory() {
    const history = await History.findAll({ include: [Workout] })

    return history
}

export async function addWorkoutToHistory({ id, userId }) {
    const checkWorkoutExisting = await getOneWorkout({ id, userId })

    if (!checkWorkoutExisting) {
        throw CustomError.notFound('Workout not found')
    }

    const addedToHistory = await History.create({ workoutId: id })

    return addedToHistory
}

