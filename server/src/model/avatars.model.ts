import { mongoose, connection } from '../services/mongoose'

const avatar = new mongoose.Schema({
  username: String,
  name: String,
  size: Number,
  image: Buffer,
})

export interface AvatarProps {
  username: string
  name: string
  size: number
  image: Buffer
}

const Avatar = mongoose.model<AvatarProps>('avatars', avatar)

export default Avatar
