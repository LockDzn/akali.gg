export interface UserProps {
  id: string
  name: string
  displayName: string
  icon: string
  riot: {
    id: string
    puuid: string
    accountId: string
  }
}

export interface FriendProps {
  id: string
  name: string
  displayName: string
  icon: string
  riot: {
    id: string
    puuid: string
    accountId: string
  }
}
