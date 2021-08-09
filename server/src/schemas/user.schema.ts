import { mongoose, database } from '../services/mongoose'

const user = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    unique: true,
  },
  icon: String,
  password: String,
  riot: {
    id: String,
    accountId: String,
    puuid: String,
  },
  friends: [mongoose.Types.ObjectId],
  pendingFriends: [mongoose.Types.ObjectId],
})

export interface UserProps {
  name: String
  icon: String
  password: String
  riot: {
    id: String
    accountId: String
    puuid: String
  }
  friends: Array<mongoose.Types.ObjectId>
  pendingFriends: Array<mongoose.Types.ObjectId>
}

const User = mongoose.model<UserProps>('users', user)

export default User
