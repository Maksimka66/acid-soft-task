import { Router } from 'express'
import { getHistory } from './history.service.js'

const historyRouter = new Router()

historyRouter.get('/', async (req, res, next) => {
    try {
        const { id } = req.user

        const history = await getHistory({ id })

        return res.json(history)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default historyRouter

