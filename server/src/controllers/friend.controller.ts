import { Request, Response } from 'express'
import createError from 'http-errors'

import User, { UserProps } from '../schemas/user.schema'

import { mongoose } from '../services/mongoose'

import { formatSummonerName } from '../utils/formatString'

interface FriendProps {
  id: String
  name: String
  displayName: String
  icon: String
  riot: {
    id: String
    accountId: String
    puuid: String
  }
}

async function friendsList(request: Request, response: Response) {
  const { name } = request.params

  if (!name) {
    throw createError(400, `Need user id`)
  }

  const formattedName = formatSummonerName(name)

  const user = await User.findOne({ name: formattedName }).exec()

  if (!user) {
    throw createError(404, `User not found`)
  }

  const friendsNames = user.friends

  let friends = [] as FriendProps[]

  for (var i = 0; i < friendsNames.length; i++) {
    const pendingFriendUser = await User.findOne({
      name: friendsNames[i],
    }).exec()

    if (pendingFriendUser) {
      friends.push({
        id: pendingFriendUser._id,
        name: pendingFriendUser.name,
        displayName: pendingFriendUser.displayName,
        icon: pendingFriendUser.icon,
        riot: pendingFriendUser.riot,
      })
    }
  }

  return response.status(200).json(friends)
}

async function friendWishList(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''

  const user = await User.findOne({ _id: userId }).exec()

  const pendingFriendsName = user?.pendingFriends || []

  let pendingFriends = [] as FriendProps[]

  for (var i = 0; i < pendingFriendsName.length; i++) {
    const pendingFriendUser = await User.findOne({
      name: pendingFriendsName[i],
    }).exec()

    if (pendingFriendUser) {
      pendingFriends.push({
        id: pendingFriendUser._id,
        name: pendingFriendUser.name,
        displayName: pendingFriendUser.displayName,
        icon: pendingFriendUser.icon,
        riot: pendingFriendUser.riot,
      })
    }
  }

  response.json(pendingFriends)
}

async function acceptFriend(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''

  const { name } = request.body

  if (!name) {
    throw createError(400, `Need user name`)
  }

  const formattedName = formatSummonerName(name)

  const newFriendUser = await User.findOne({ name: name }).exec()

  if (!newFriendUser) {
    throw createError(404, `User already exists`)
  }

  const newFriendName = newFriendUser.name

  const user = await User.findOne({ _id: userId }).exec()

  if (!user?.pendingFriends.includes(newFriendName)) {
    throw createError(404, `This user has not sent a friend request.`)
  }

  user.pendingFriends = user.pendingFriends.filter(
    (name) => name !== newFriendName
  )
  user.friends.push(newFriendName)
  user.save()

  newFriendUser.pendingFriends = newFriendUser.pendingFriends.filter(
    (name) => name != newFriendName
  )
  newFriendUser.friends.push(user.name)
  newFriendUser.save()

  return response
    .status(200)
    .json({ message: 'Friend request successfully accepted' })
}

async function sendFriendRequest(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''
  const user = await User.findOne({ _id: userId }).exec()

  const { name } = request.body

  if (!name) {
    throw createError(400, `Need user name`)
  }

  if (!user) {
    throw createError(500, `You are not logged inNeed user name`)
  }

  const formattedName = formatSummonerName(name)

  const newFriendUser = await User.findOne({ name: formattedName }).exec()

  if (!newFriendUser) {
    throw createError(404, `User already exists`)
  }

  if (newFriendUser._id.toString() == user?._id.toString()) {
    throw createError(400, `You can't send yourself a friend request`)
  }

  if (newFriendUser.pendingFriends.includes(user?.name)) {
    throw createError(400, `Friend request has already been sent`)
  }

  newFriendUser.pendingFriends.push(user?.name)
  newFriendUser.save()
  response.status(200).json({ message: 'Friend request sent' })
}

export default { friendsList, sendFriendRequest, friendWishList, acceptFriend }
