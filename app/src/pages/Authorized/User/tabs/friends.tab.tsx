import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAuth } from '../../../../hooks/useAuth'
import api from '../../../../services/api.service'

import { FriendProps } from '../../../../interfaces'

import { Button } from '../../../../components/Button'

import { FriendsContainer } from './styles'
import { NoProfileImage } from '../../../../components/NoProfileImage'

export function FriendsTab() {
  const { name } = useParams() as { name: string; tab: string }

  const { user } = useAuth()

  const [tab, setTab] = useState(0)
  const [friends, setFriends] = useState<FriendProps[]>([])
  const [paddingFriends, setPaddingFriends] = useState<FriendProps[]>([])
  const [isTheUserAuthenticated] = useState(user?.name === name)

  console.log(isTheUserAuthenticated)

  useEffect(() => {
    load()

    async function load() {
      try {
        const response = await api.get(`/user/${name}/friends`)
        const data = response.data as FriendProps[]
        setFriends(data)
      } catch (error) {}
    }
  }, [name])

  useEffect(() => {
    load()

    async function load() {
      try {
        const response = await api.get(`/me/paddingfriends`)
        const data = response.data as FriendProps[]
        setPaddingFriends(data)
      } catch (error) {}
    }
  }, [])

  async function acceptFriend(friendName: string) {
    try {
      await api.post(`/me/paddingfriends`, {
        name: friendName,
      })

      const newFriend = paddingFriends.find(
        (content) => content.name === friendName
      )

      if (newFriend) {
        setFriends([...friends, newFriend])
      }

      setPaddingFriends(
        paddingFriends.filter((content) => content.name !== friendName)
      )
    } catch (error) {
      alert('An error occurred, try later')
      console.error(error)
    }
  }

  async function rejectFriend(friendName: string) {
    try {
      await api.delete('/me/paddingfriends', {
        data: { name: friendName },
      })

      setPaddingFriends(
        paddingFriends.filter((content) => content.name !== friendName)
      )
    } catch (error) {
      alert('An error occurred, try later')
      console.error(error)
    }
  }

  return (
    <FriendsContainer>
      <nav>
        <ul>
          <li className={`${tab === 0 && 'seleted'}`} onClick={() => setTab(0)}>
            Todos os amigos ({friends.length})
          </li>
          {isTheUserAuthenticated && (
            <li
              className={`${tab === 1 && 'seleted'}`}
              onClick={() => setTab(1)}
            >
              Pendente ({paddingFriends.length})
            </li>
          )}
        </ul>
      </nav>
      <div className="list">
        {tab === 0 &&
          friends.map((friend) => (
            <div className="friendCard" key={friend.id}>
              {friend.icon ? (
                <img src={friend.icon} alt={`${friend.icon} icon`} />
              ) : (
                <NoProfileImage
                  name={friend.displayName}
                  width={48}
                  height={48}
                />
              )}
              <Link to={`/user/${friend.name}`} className="name">
                {friend.displayName}
              </Link>
              <div></div>
            </div>
          ))}

        {tab === 1 &&
          paddingFriends.map((friend) => (
            <div className="friendCard paddingFriendCard" key={friend.id}>
              <img
                src="https://assets.faceit-cdn.net/avatars/f6df2599-8174-467b-a4e9-fdfe0e40a719_1615691262786.jpg"
                alt=""
              />
              <Link to={`/user/${friend.name}`} className="name">
                {friend.displayName}
              </Link>
              <div className="actions">
                <Button onClick={() => acceptFriend(friend.name)} opaque>
                  aceitar
                </Button>
                <Button onClick={() => rejectFriend(friend.name)} opaque>
                  remover
                </Button>
              </div>
            </div>
          ))}
      </div>
    </FriendsContainer>
  )
}
