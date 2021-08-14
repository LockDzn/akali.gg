import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

import { verifyToken } from '../utils/jwt'

export async function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers

  if (!authorization) {
    throw createError(400, `Missing authorization token.`)
  }

  try {
    await verifyToken(authorization)
    return next()
  } catch (error) {
    throw createError(401, `Invalid authentication token.`)
  }
}
