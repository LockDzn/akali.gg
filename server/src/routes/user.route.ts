import express from 'express'
import asyncHandler from 'express-async-handler'
import { multer, config } from '../services/multer'

import { verifyAuthentication } from '../middlewares/session.middleware'

import userController from '../controllers/user.controller'
import friendController from '../controllers/friend.controller'
import userAvatarController from '../controllers/userAvatar.controller'

const routes = express.Router()

// Route to create user
routes.post('/user/create', asyncHandler(userController.create))

routes.get('/user/:name', asyncHandler(userController.index))
routes.get('/user/:name/friends', asyncHandler(friendController.friendsList))

routes.put(
  '/me/avatar',
  asyncHandler(verifyAuthentication),
  multer(config).single('file'),
  asyncHandler(userAvatarController.updateUserAvatar)
)

routes.post(
  '/me/friend',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.sendFriendRequest)
)

routes.delete(
  '/me/friend',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.removeFriend)
)

routes.get(
  '/me/paddingfriends',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.friendsRequestList)
)

routes.post(
  '/me/paddingfriends',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.acceptFriend)
)

routes.delete(
  '/me/paddingfriends',
  asyncHandler(verifyAuthentication),
  asyncHandler(friendController.rejectFriendRequest)
)

export default routes
