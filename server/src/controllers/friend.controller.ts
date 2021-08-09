import { Request, Response } from 'express'
import createError from 'http-errors'

import User, { UserProps } from '../schemas/user.schema'
import { mongoose } from '../services/mongoose'

interface FriendProps {
  _id: String
  name: String
  icon: String
  riot: {
    id: String
    accountId: String
    puuid: String
  }
}

async function friendsList(request: Request, response: Response) {
  const { id } = request.params

  if (!id) {
    throw createError(400, `Need user id`)
  }

  const user = await User.findOne({ _id: id }).exec()

  if (!user) {
    throw createError(404, `User not found`)
  }

  const friendsIds = user.friends

  let friends = [] as FriendProps[]

  for (var i = 0; i < friendsIds.length; i++) {
    const pendingFriendUser = await User.findOne({
      _id: friendsIds[i],
    }).exec()

    if (pendingFriendUser) {
      friends.push({
        _id: pendingFriendUser._id,
        name: pendingFriendUser.name,
        icon: pendingFriendUser.icon,
        riot: pendingFriendUser.riot,
      })
    }
  }

  return response.status(200).json(friends)
}

async function friendWishList(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''

  const user = (await User.findOne({ _id: userId }).exec()) as UserProps

  const pendingFriendsId = user.pendingFriends as Array<mongoose.Types.ObjectId>

  let pendingFriends = [] as FriendProps[]

  for (var i = 0; i < pendingFriendsId.length; i++) {
    const pendingFriendUser = await User.findOne({
      _id: pendingFriendsId[i],
    }).exec()

    if (pendingFriendUser) {
      pendingFriends.push({
        _id: pendingFriendUser._id,
        name: pendingFriendUser.name,
        icon: pendingFriendUser.icon,
        riot: pendingFriendUser.riot,
      })
    }
  }

  response.json(pendingFriends)
}

async function acceptFriend(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''

  const { name, id } = request.body

  let newFriendUser

  if (name) {
    newFriendUser = await User.findOne({ name: name }).exec()
  } else if (id) {
    newFriendUser = await User.findOne({ _id: id }).exec()
  } else {
    throw createError(400, `Need user name or id`)
  }

  if (!newFriendUser) {
    throw createError(404, `User already exists`)
  }

  const newFriendId = newFriendUser._id as mongoose.Types.ObjectId

  const user = await User.findOne({ _id: userId }).exec()

  if (user?.pendingFriends.includes(newFriendId)) {
    user.pendingFriends = user.pendingFriends.filter(
      (id) => id.toString() !== newFriendId.toString()
    )
    user.friends.push(newFriendId)
    user.save()

    newFriendUser.pendingFriends = newFriendUser.pendingFriends.filter(
      (id) => id.toString() != user?.id.toString()
    )
    newFriendUser.friends.push(user?.id)
    newFriendUser.save()

    return response
      .status(200)
      .json({ message: 'Friend request successfully accepted' })
  } else {
    throw createError(404, `This user has not sent a friend request.`)
  }
}

async function sendFriendRequest(request: Request, response: Response) {
  const userId = request.user ? request.user.id : ''
  const user = await User.findOne({ _id: userId }).exec()

  const { name, id } = request.body

  let newFriendUser

  if (name) {
    newFriendUser = await User.findOne({ name: name }).exec()
  } else if (id) {
    newFriendUser = await User.findOne({ _id: id }).exec()
  } else {
    throw createError(400, `Need user name or id`)
  }

  if (!newFriendUser) {
    throw createError(404, `User already exists`)
  }

  if (newFriendUser._id.toString() == user?._id.toString()) {
    throw createError(400, `You can't send yourself a friend request`)
  }

  newFriendUser.pendingFriends.push(user?._id)
  newFriendUser.save()
  response.status(200).json({ message: 'Friend request sent' })
}

export default { friendsList, sendFriendRequest, friendWishList, acceptFriend }
