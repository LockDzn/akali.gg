import express from 'express'
import asyncHandler from 'express-async-handler'

import sessionController from '../controllers/session.controller'
import { verifyAuthentication } from '../middlewares/session.middleware'

const routes = express.Router()

routes.get(
  '/session',
  asyncHandler(verifyAuthentication),
  asyncHandler(sessionController.verify)
)
routes.post('/session', asyncHandler(sessionController.create))

export default routes
