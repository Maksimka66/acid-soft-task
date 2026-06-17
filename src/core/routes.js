import { Router } from 'express'
import workoutRouter from '../modules/workout/workout.routes.js'
import historyRouter from '../modules/history/history.routes.js'
import userRouter from '../modules/user/user.routes.js'
import authHandler from '../middlewares/authMiddleware.js'

const router = new Router()

router.use('/user', userRouter)
router.use('/workouts', authHandler, workoutRouter)
router.use('/history', historyRouter)

export default router

