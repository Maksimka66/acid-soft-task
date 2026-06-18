import { Router } from 'express'

const historyRouter = new Router()

historyRouter.get('/', async (req, res, next) => {
    try {
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default historyRouter

