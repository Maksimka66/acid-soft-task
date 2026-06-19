import { Exercise } from './exercise.model.js'
import { CustomError } from '../../errorHandlers/apiErrors.js'

class ExerciseService {
    getAllExercises = async (workoutId) => {
        const exercises = await Exercise.findAll({
            where: {
                workoutId
            }
        })

        return exercises
    }

    getOneExercise = async (id) => {
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

    createExercise = async ({ workoutId, name, sets, reps, weight }) => {
        const newExercise = await Exercise.create({
            workoutId,
            name,
            sets,
            reps,
            weight
        })

        return newExercise
    }
}

export default new ExerciseService()

