import { Workout } from './workout.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

class WorkoutService {
    getAllWorkouts = async () => {
        const workouts = await Workout.findAll()

        return workouts
    }

    getOneWorkout = async (id) => {
        const workout = await Workout.findOne({
            where: {
                id
            }
        })

        if (!workout) {
            throw CustomError.badRequest('No such workouts!')
        }

        return workout
    }

    createWorkout = async ({ userId, name, description }) => {
        const newWorkout = await Workout.create({
            userId,
            name,
            description
        })

        return newWorkout
    }

    updateWorkout = async ({ id, data }) => {
        const workout = await this.getOneWorkout(id)

        if (workout) {
            await workout.update(data)

            return workout
        }
    }

    deleteWorkout = async (id) => {
        const workout = await this.getOneWorkout(id)

        if (workout) {
            const deletedWorkout = await workout.destroy()

            return deletedWorkout
        }
    }
}

export default new WorkoutService()

