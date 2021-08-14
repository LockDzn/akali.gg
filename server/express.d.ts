declare namespace Express {
  export interface Request {
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
}
