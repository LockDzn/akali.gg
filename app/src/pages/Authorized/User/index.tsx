import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { UserProps } from '../../../interfaces'

import { Container, UserCard, UserInformation, Nav, LiLink } from './styles'

import { Layout } from '../../../components/Layout'
import { Tabs } from './tabs'

import AkaliIcon from '../../../assets/icons/akali.png'
import api from '../../../services/api.service'
import { Button } from '../../../components/Button'
interface ParamsProps {
  name: string
  tab?: string
}

export function User() {
  const { name, tab = 'home' } = useParams() as ParamsProps
  const history = useHistory()

  const [sideBarAnimation, setSideBarAnimation] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserProps | undefined>()

  useEffect(() => {
    start()

    async function start() {
      try {
        const response = await api.get(`/user/${name}`)
        const data = response.data
        setUser({
          id: data.id,
          name: data.name,
          displayName: data.displayName,
          icon: data.icon,
          riot: data.riot,
        })
      } catch (error) {
        history.push('/notfound')
      }

      setLoading(false)
    }
  }, [name])

  useEffect(() => {
    setTimeout(() => {
      setSideBarAnimation(true)
    }, 200)
  }, [])

  if (loading) {
    return <h1>loading</h1>
  }

  if (!user) {
    return <h1>user not found</h1>
  }

  return (
    <Layout disableSidebar={sideBarAnimation}>
      <Container>
        <UserCard>
          <div className="start">
            <img className="userIcon" src={AkaliIcon} alt="User profile" />
            <div className="information">
              <h1>{user.displayName}</h1>
              <span>Membro desde 1 de março de 2021</span>
            </div>
          </div>

          <div className="end">
            <Button>Adicionar</Button>
          </div>
        </UserCard>
        <UserInformation>
          <Nav>
            <ul>
              <LiLink
                seleted={tab === 'home'}
                onClick={() => history.push(`/user/${user.name}`)}
              >
                Home
              </LiLink>
              <LiLink
                seleted={tab === 'friends'}
                onClick={() => history.push(`/user/${user.name}/friends`)}
              >
                Amigos
              </LiLink>
              <LiLink
                seleted={tab === 'historic'}
                onClick={() => history.push(`/user/${user.name}/historic`)}
              >
                Histórico
              </LiLink>
            </ul>
          </Nav>
          <div>
            <Tabs tab={tab} />
          </div>
        </UserInformation>
      </Container>
    </Layout>
  )
}
