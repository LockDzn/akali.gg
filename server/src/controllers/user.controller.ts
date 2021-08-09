import { Request, Response } from 'express'
import createError from 'http-errors'

import User from '../schemas/user.schema'
import Sessions from '../schemas/sessions.schema'

import { hash } from '../utils/hash'
import { getSummonerByName, getThirdPartyCode } from '../services/riotapi'
import { signToken } from '../utils/jwt'

async function index(request: Request, response: Response) {
  new Sessions({ name: 'ola' }).save()
  return response.json({})
}

async function create(request: Request, response: Response) {
  const { summonerName, verificationCode, password } = request.body
  const requestIp =
    request.headers['x-forwarded-for'] || request.socket.remoteAddress

  if (!summonerName || !verificationCode || !password) {
    return response.status(400).json({ message: 'Missing information on body' })
  }

  const findUser = await User.findOne({ name: summonerName }).exec()
  if (findUser) {
    return response
      .status(400)
      .json({ message: 'User already exists', name: 'ExistingUser' })
  }

  const formattedSummonerName = summonerName.replace(/\s/g, '').toLowerCase()
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
      name: summonerName,
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
  const { summonerName, password } = request.body

  if (!summonerName || !password) {
    return response.status(400).json({ message: 'Missing information on body' })
  }

  const formattedSummonerName = summonerName.replace(/\s/g, '').toLowerCase()
  const thirdPartyCode = await getThirdPartyCode(formattedSummonerName)
  const summonerUser = await getSummonerByName(formattedSummonerName)

  if (thirdPartyCode.code == 400) {
    return response.status(401).json({ message: 'Not authorized' })
  }

  try {
    const passwordHash = hash(password)

    const user = new User({
      name: summonerName,
      icon: '',
      password: passwordHash,
      riot: {
        id: summonerUser.id,
        accountId: summonerUser.accountId,
        puuid: summonerUser.puuid,
      },
    }).save()

    response.status(200).json(user)
  } catch (err) {
    console.error(err)
    return response.status(500).json({ message: 'Try later' })
  }
}

export default { index, create }
