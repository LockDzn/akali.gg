import express from 'express'
import asyncHandler from 'express-async-handler'

import { verifyAuthentication } from '../middlewares/session.middleware'

import userController from '../controllers/user.controller'
import friendController from '../controllers/friend.controller'

const routes = express.Router()

routes.get('/user', asyncHandler(userController.index))
routes.post('/user', asyncHandler(userController.create))

routes.get('/user/:id/friends', asyncHandler(friendController.friendsList))

routes.post(
  '/user/friend',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.sendFriendRequest)
)

routes.get(
  '/user/paddingfriends',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.friendWishList)
)

routes.post(
  '/user/paddingfriends',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.acceptFriend)
)

export default routes
