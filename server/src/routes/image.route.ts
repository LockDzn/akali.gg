import express from 'express'
import asyncHandler from 'express-async-handler'

import userAvatarController from '../controllers/userAvatar.controller'

const routes = express.Router()

routes.get(
  '/profile/:id/:name',
  asyncHandler(userAvatarController.getUserAvatar)
)

export default routes
