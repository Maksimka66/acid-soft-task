import { Router } from 'express'
import workoutRouter from '../modules/workout/workout.routes.js'
import historyRouter from '../modules/history/history.routes.js'
import userRouter from '../modules/user/user.routes.js'
import authHandler from '../middlewares/authMiddleware.js'
import exerciseRouter from '../modules/exercise/exercise.routes.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/workouts', authHandler, workoutRouter)
router.use('/exercises', authHandler, exerciseRouter)
router.use('/history', authHandler, historyRouter)

export default router

