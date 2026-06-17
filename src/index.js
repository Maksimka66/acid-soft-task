import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import router from './core/routes.js'
import sequelize from './core/sequelize.js'
import './modules/modelsConnection.js'
import { errorHandler } from './middlewares/errorHandlingMiddleware.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const port = process.env.SERVER_PORT || 4000

async function connectDb() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(port, () => {
            console.log(`Server started on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

connectDb()

