import { IoIosPeople } from 'react-icons/io'

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../Button'

import { Container, Unauthenticated, Authenticated } from './styles'

import AkaliIcon from '../../assets/icons/akali.png'
import { useHistory } from 'react-router-dom'
import { NoProfileImage } from '../NoProfileImage'

export function Header() {
  const history = useHistory()

  const { user, logOff } = useAuth()

  return (
    <Container>
      {user ? (
        <Authenticated>
          <div className="logo">
            <h1>Akali.gg</h1>
          </div>
          <div className="session">
            <div className="account">
              <div className="user">
                {user.icon ? (
                  <img src={user.icon} alt="User profile" />
                ) : (
                  <NoProfileImage
                    name={user.displayName}
                    width={38}
                    height={38}
                  />
                )}
                <span>{user.displayName}</span>
              </div>
              <div className="user-dropdown">
                <button onClick={() => history.push(`/user/${user.name}`)}>
                  Conta
                </button>
                <button onClick={() => history.push(`/settings`)}>
                  Configurações
                </button>
                <button onClick={logOff}>Deslogar</button>
              </div>
            </div>
            <div className="bar"></div>
            <div className="actions">
              <IoIosPeople />
              <IoIosPeople />
              <IoIosPeople />
            </div>
          </div>
        </Authenticated>
      ) : (
        <Unauthenticated>
          <div className="logo">
            <h1>Akali.gg</h1>
          </div>
          <div className="session">
            <Button onClick={() => history.push('/create-account')}>
              Criar conta
            </Button>
            <Button onClick={() => history.push('/auth')} opaque>
              Iniciar sessão
            </Button>
          </div>
        </Unauthenticated>
      )}
    </Container>
  )
}
