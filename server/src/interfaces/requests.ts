import { Request } from 'express'

export interface AuthorizedRequest extends Request {
  user: {
    _id: String
    displayName: String
    name: String
    icon: String
    riot: {
      id: String
      accountId: String
      puuid: String
    }
    friends: String[]
    pendingFriends: String[]
  }
}

export interface UserRequest extends Request {
  user?: {
    _id: String
    displayName: String
    name: String
    icon: String
    riot: {
      id: String
      accountId: String
      puuid: String
    }
    friends: String[]
    pendingFriends: String[]
  }
}
