import { Request, Response } from 'express'
import createError from 'http-errors'

import User from '../schemas/user.schema'
import Sessions from '../schemas/sessions.schema'

import { getSummonerByName, getThirdPartyCode } from '../services/riotapi'

import { hash } from '../utils/hash'
import { signToken } from '../utils/jwt'
import { formatSummonerName } from '../utils/formatString'

async function index(request: Request, response: Response) {
  const { name } = request.params

  const formattedName = formatSummonerName(name)

  const user = await User.findOne({ name: formattedName }).exec()

  if (!user) {
    return response.status(404).json({
      message: `User ${formattedName} not found`,
      name: 'UserNotFound',
    })
  }

  return response.status(200).json({
    id: user._id,
    name: user.name,
    displayName: user.displayName,
    icon: user.icon,
    riot: user.riot,
    friends: user.friends,
  })
}

async function create(request: Request, response: Response) {
  const { summonerName, verificationCode, password } = request.body
  const requestIp =
    request.headers['x-forwarded-for'] || request.socket.remoteAddress

  if (!summonerName || !verificationCode || !password) {
    return response.status(400).json({ message: 'Missing information on body' })
  }

  const formattedSummonerName = formatSummonerName(summonerName)

  const findUser = await User.findOne({ name: formattedSummonerName }).exec()
  if (findUser) {
    return response
      .status(400)
      .json({ message: 'User already exists', name: 'ExistingUser' })
  }

  const thirdPartyCode = await getThirdPartyCode(formattedSummonerName)
  const summonerUser = await getSummonerByName(formattedSummonerName)

  if (thirdPartyCode.code == 400) {
    return response
      .status(401)
      .json({ message: 'Not authorized', name: 'InvalidVerificationCode' })
  }

  if (thirdPartyCode.code !== verificationCode.trim()) {
    return response
      .status(401)
      .json({ message: 'Not authorized', name: 'InvalidVerificationCode' })
  }

  try {
    const passwordHash = await hash(password)

    const user = await new User({
      name: formattedSummonerName,
      displayName: summonerName,
      icon: summonerUser.profileIconId,
      password: passwordHash,
      riot: {
        id: summonerUser.id,
        accountId: summonerUser.accountId,
        puuid: summonerUser.puuid,
      },
      friends: [],
      pendinFriends: [],
    }).save()

    await new Sessions({
      _id: user._id,
      list: [
        {
          ip: requestIp,
          date: new Date(),
        },
      ],
    }).save()

    const jwToken = signToken({ name: summonerName, _id: user._id })

    response.status(200).json({ token: jwToken })
  } catch (err) {
    console.error(err)
    return response.status(500).json({ message: 'Try later' })
  }
}

async function remove(request: Request, response: Response) {
  console.log('')
}

export default { index, create }
