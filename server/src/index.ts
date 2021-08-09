import express from 'express'
import asyncHandler from 'express-async-handler'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import routes from './routes'
import errorController from './controllers/error.controller'

const app = express()

app.use(express.json())
app.use(cors())
routes.forEach((route) => {
  app.use(route)
})

app.use(errorController.handlerError)

const PORT = 3333

app.listen(PORT, () => {
  console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`)
})
