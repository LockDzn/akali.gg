import { Request, Response } from 'express'
import createHttpError from 'http-errors'

import Avatar from '../model/avatars.model'
import User from '../model/user.model'

async function getUserAvatar(request: Request, response: Response) {
  const { id, name } = request.params

  const avatar = await Avatar.findOne({ _id: id, name }).exec()

  if (!avatar) throw createHttpError(404, `Image not found.`)

  response.set('Content-Type', 'image/png')
  response.send(avatar.image)
}

async function updateUserAvatar(request: Request, response: Response) {
  const file = request.file

  const avatar = await new Avatar({
    username: request.user?.name,
    name: `${request.user?.name}.png`,
    size: file?.size,
    image: file?.buffer,
  }).save()

  const url = `http://localhost:3333/profile/${avatar._id}/${avatar.name}`

  const user = await User.findOne({ name: request.user?.name }).exec()

  if (user) {
    user.icon = url
    user.save()
  }

  response.status(200).json({
    id: avatar._id,
    name: avatar.name,
    size: avatar.size,
    url,
  })
}

export default { getUserAvatar, updateUserAvatar }
