import { mongoose, connection } from '../services/mongoose'

const user = new mongoose.Schema({
  displayName: {
    type: String,
    index: true,
    unique: true,
  },
  name: String,
  icon: String,
  password: String,
  riot: {
    id: String,
    accountId: String,
    puuid: String,
  },
  friends: [String],
  pendingFriends: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export interface UserProps {
  displayName: String
  name: String
  icon: String
  password: string
  riot: {
    id: String
    accountId: String
    puuid: String
  }
  friends: Array<String>
  pendingFriends: Array<String>
  createdAt: Date
}

const User = mongoose.model<UserProps>('users', user)

export default User
