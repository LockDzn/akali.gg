import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

import User from '../schemas/user.schema'
import Sessions from '../schemas/sessions.schema'

import { compare, hash } from '../utils/hash'
import { signToken, verifyToken } from '../utils/jwt'

async function verify(
  request: Request,
  response: Response,
  next: NextFunction
) {
  return response.json({ message: 'ok' })
}

async function create(request: Request, response: Response) {
  const { summonerName, password } = request.body
  const requestIp =
    request.headers['x-forwarded-for'] || request.socket.remoteAddress

  if (!summonerName || !password) {
    throw createError(400, `Missing information on body`)
  }

  const findUser = await User.findOne({ name: summonerName }).exec()
  if (!findUser) {
    throw createError(400, `User already exists`)
  }

  const formattedSummonerName = summonerName.replace(/\s/g, '').toLowerCase()
  const result = await compare(password, findUser.password)

  if (!result) {
    throw createError(401, `Not authorized`)
  }

  const jwToken = signToken({ name: summonerName, _id: findUser._id })

  const userSessions = await Sessions.findById({ _id: findUser._id })

  if (userSessions) {
    userSessions.list.push({ date: new Date(), ip: requestIp })
    userSessions.save()
  }

  return response.status(200).json({ token: jwToken })
}

export default { verify, create }
