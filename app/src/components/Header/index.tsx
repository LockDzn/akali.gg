import { IoIosPeople } from 'react-icons/io'

import { useAuth } from '../../hooks/useAuth'

import { Button } from '../Button'

import { Container, Unauthenticated, Authenticated } from './styles'

import AkaliIcon from '../../assets/icons/akali.png'
import { useHistory } from 'react-router-dom'

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
                <img src={AkaliIcon} alt="User profile" />
                <span>{user.displayName}</span>
              </div>
              <div className="user-dropdown">
                <button disabled>Conta</button>
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
