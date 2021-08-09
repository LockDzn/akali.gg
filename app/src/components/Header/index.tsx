import { useState } from 'react'
import { IoIosPeople } from 'react-icons/io'

import { Button } from '../Button'

import { Container, Unauthenticated, Authenticated } from './styles'

import AkaliIcon from '../../assets/icons/akali.png'

export function Header() {
  const [isAuthenticated, setisAuthenticated] = useState(true)

  return (
    <Container>
      {isAuthenticated ? (
        <Authenticated>
          <div className="logo">
            <h1>Akali.gg</h1>
          </div>
          <div className="session">
            <div className="account">
              <div className="user">
                <img src={AkaliIcon} alt="User profile" />
                <span>LoockDzn</span>
              </div>
              <div className="user-dropdown">
                <button disabled>Conta</button>
                <button>Deslogar</button>
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
            <Button>Criar conta</Button>
            <Button opaque>Iniciar sessão</Button>
          </div>
        </Unauthenticated>
      )}
    </Container>
  )
}
