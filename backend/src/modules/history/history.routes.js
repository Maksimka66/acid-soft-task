import { Router } from 'express'
import { getHistory, addWorkoutToHistory } from './history.service.js'

const historyRouter = new Router()

historyRouter.get('/', async (req, res, next) => {
    try {
        const history = await getHistory()

        return res.json(history)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default historyRouter

