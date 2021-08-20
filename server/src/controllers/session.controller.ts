import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'

import User from '../model/user.model'
import Sessions from '../model/sessions.model'

import { compare, hash } from '../utils/hash'
import { signToken, verifyToken } from '../utils/jwt'
import { formatSummonerName } from '../utils/formatString'

async function verify(request: Request, response: Response) {
  const findUser = await User.findOne({ _id: request.user?._id }).exec()
  if (!findUser) {
    throw createError(400, `User already exists`)
  }

  return response.json({
    id: findUser._id,
    name: findUser.name,
    displayName: findUser.displayName,
    icon: findUser.icon,
    riot: findUser.riot,
  })
}

async function create(request: Request, response: Response) {
  const { summonerName, password } = request.body
  const requestIp =
    request.headers['x-forwarded-for'] || request.socket.remoteAddress

  if (!summonerName || !password) {
    throw createError(400, `Missing information on body`)
  }

  const formattedSummonerName = formatSummonerName(summonerName)

  const findUser = await User.findOne({ name: formattedSummonerName }).exec()
  if (!findUser) {
    throw createError(400, `User already exists`)
  }

  const result = await compare(password, findUser.password)

  if (!result) {
    throw createError(401, `Summoner name or invalid password`)
  }

  const jwToken = signToken({ name: formattedSummonerName, _id: findUser._id })

  const userSessions = await Sessions.findById({ _id: findUser._id })

  if (userSessions) {
    userSessions.list.push({ date: new Date(), ip: requestIp })
    userSessions.save()
  }

  return response.status(200).json({
    token: jwToken,
    user: {
      id: findUser._id,
      name: findUser.name,
      displayName: findUser.displayName,
      icon: findUser.icon,
      riot: findUser.riot,
    },
  })
}

export default { verify, create }
