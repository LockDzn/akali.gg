import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import api from '../../services/api'

import { Container, Input } from './styles'

import { Button } from '../../components/Button'

import LolLogo from '../../assets/lol-logo.png'
import { useAuth } from '../../hooks/useAuth'
import { UserProps } from '../../contexts/auth.context'

export function Auth() {
  const [summonerName, setSummonerName] = useState('')
  const [password, setPassword] = useState('')

  const [fromLoading, setFromLoading] = useState(false)

  const history = useHistory()
  const { logIn } = useAuth()

  async function handleAuth(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setFromLoading(true)

    try {
      const response = await api.post('/session', {
        summonerName,
        password,
      })

      const token = response.data.token
      const user = response.data.user as UserProps
      if (!token) return
      if (!user) return

      logIn(token, user)
      history.push('/home')
    } catch (error) {
      console.log(error.response.data)
    }

    setFromLoading(false)
  }

  return (
    <Container>
      <div className="login">
        <div className="summoner flex-center">
          <h1>Auth</h1>
          <img src={LolLogo} alt="League of Legends" />
          <form onSubmit={handleAuth}>
            <div className="field">
              <label htmlFor="summoner">Nome do summoner:</label>
              <Input
                id="summoner"
                type="text"
                value={summonerName}
                onChange={(event) => setSummonerName(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Senha:</label>
              <p>Senha da sua conta na plataforma.</p>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="actions">
              <Button disabled={fromLoading} type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
