import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

import User from '../model/user.model'

import { UserRequest } from '../interfaces/requests'

import { verifyToken } from '../utils/jwt'

export default async function requestMiddleware(
  request: UserRequest,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (authorization) {
    try {
      const result = await verifyToken(authorization)

      const user = await User.findOne({ _id: result._id }).exec()
      if (user) {
        request.user = {
          _id: user._id,
          displayName: user.displayName,
          name: user.name,
          icon: user.icon,
          riot: user.riot,
          friends: user.friends,
          pendingFriends: user.pendingFriends,
        }
      }
    } catch (error) {
      request.user = undefined
    }
  } else {
    request.user = undefined
  }

  return next()
}
