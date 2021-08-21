import { Request, Response } from 'express'
import createError from 'http-errors'

import { AuthorizedRequest } from '../interfaces/requests'
import User, { UserProps } from '../model/user.model'

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

  if (!name || name.trim() === '') {
    throw createError(400, {
      title: 'NeedUsername',
      message: `Missing "name" in body`,
    })
  }

  const formattedName = formatSummonerName(name)

  const user = await User.findOne({ name: formattedName }).exec()

  if (!user) {
    throw createError(404, {
      title: 'UserNotFound',
      message: `User "${name}" does not exist`,
    })
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

async function sendFriendRequest(
  request: AuthorizedRequest,
  response: Response
) {
  const user = await User.findOne({ _id: request.user._id }).exec()

  const { name } = request.body

  if (!name || name.trim() === '') {
    throw createError(400, {
      title: 'NeedUsername',
      message: `Missing "name" in body`,
    })
  }

  if (!user) {
    throw createError(500, `user is not logged in.`)
  }

  const formattedName = formatSummonerName(name)

  const newFriendUser = await User.findOne({ name: formattedName }).exec()

  if (!newFriendUser) {
    throw createError(404, {
      title: 'UserNotFound',
      message: `User "${name}" does not exist`,
    })
  }

  if (newFriendUser._id.toString() == user?._id.toString()) {
    throw createError(400, {
      title: 'BadRequest',
      message: `You can't send yourself a friend request.`,
    })
  }

  if (newFriendUser.pendingFriends.includes(user?.name)) {
    throw createError(400, {
      title: 'BadRequest',
      message: `Friend request has already been sent.`,
    })
  }

  newFriendUser.pendingFriends.push(user.name)
  newFriendUser.save()
  response.status(200).json({ message: 'Friend request sent' })
}

async function removeFriend(request: AuthorizedRequest, response: Response) {
  const { name } = request.body

  if (!name || name.trim() === '') {
    throw createError(400, {
      title: 'NeedUsername',
      message: `Missing "name" in body`,
    })
  }

  const user = await User.findOne({ _id: request.user._id })

  if (!user?.friends.includes(name)) {
    throw createError(400, {
      title: 'AreNotFriends',
      message: `"${name}" is not your friend.`,
    })
  }

  const friend = await User.findOne({ name: name })

  if (!friend) {
    throw createError(400, {
      title: 'FriendNotFound',
      message: `"${name}" was not found`,
    })
  }

  friend.friends = friend.friends.filter((username) => username !== user.name)
  friend.save()

  user.friends = user.friends.filter((username) => username !== name)
  user.save()

  return response.status(200).json({
    message: 'Friend successfully removed.',
  })
}

async function friendsRequestList(
  request: AuthorizedRequest,
  response: Response
) {
  const user = await User.findOne({ _id: request.user._id }).exec()

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

async function acceptFriend(request: AuthorizedRequest, response: Response) {
  const userId = request.user._id

  const { name } = request.body

  if (!name || name.trim() === '') {
    throw createError(400, {
      title: 'NeedUsername',
      message: `Missing "name" in body`,
    })
  }

  const formattedName = formatSummonerName(name)

  const newFriendUser = await User.findOne({ name: formattedName }).exec()

  if (!newFriendUser) {
    throw createError(404, {
      title: 'UserNotFound',
      message: `User "${name}" does not exist`,
    })
  }

  const newFriendName = newFriendUser.name

  const user = await User.findOne({ _id: userId }).exec()

  if (!user?.pendingFriends.includes(newFriendName)) {
    throw createError(400, {
      title: 'BadRequest',
      message: `This user has not sent a friend request.`,
    })
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

async function rejectFriendRequest(
  request: AuthorizedRequest,
  response: Response
) {
  const { name } = request.body

  const user = await User.findOne({ _id: request.user._id })

  if (!name || name.trim() === '') {
    throw createError(400, {
      title: 'NeedUsername',
      message: `Missing "name" in body`,
    })
  }

  if (!user?.pendingFriends.includes(name)) {
    throw createError(400, {
      title: 'BadRequest',
      message: `"${name}" didn't send you a friend request.`,
    })
  }

  user.pendingFriends = user.pendingFriends.filter(
    (userName) => userName !== name
  )
  user.save()

  return response.status(200).json({ message: 'Friend request was rejected.' })
}

export default {
  friendsList,
  sendFriendRequest,
  rejectFriendRequest,
  friendsRequestList,
  acceptFriend,
  removeFriend,
}
