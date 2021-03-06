import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import api from '../../services/api.service'

import { Container, Input, Select } from './styles'

import { Button } from '../../components/Button'

import LolLogo from '../../assets/lol-logo.png'

export function CreateAccount() {
  const [server, setServer] = useState('br')
  const [summonerName, setSummonerName] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')

  const [fromLoading, setFromLoading] = useState(false)

  const [errorName, setErrorName] = useState('')

  const history = useHistory()

  async function handleCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fromLoading) return

    setFromLoading(true)

    try {
      const response = await api.post('/user/create', {
        server,
        summonerName,
        verificationCode,
        password,
      })

      console.log(response.data.token)
      Cookies.set('token', response.data.token, { expires: 1 })
      history.push('/home')
    } catch (error) {
      const response = error.response.data

      if (response.name) {
        setErrorName(response.name)
      }
    }

    setFromLoading(false)
  }

  return (
    <Container>
      <div className="login">
        <div className="summoner flex-center">
          <h1>Auth</h1>
          <img src={LolLogo} alt="League of Legends" />
          <form onSubmit={handleCreateAccount}>
            <div className="field">
              <label htmlFor="server">Selecione seu servidor:</label>
              <Select
                id="server"
                value={server}
                onChange={(event) => setServer(event.target.value)}
              >
                <option value="br">BR</option>
              </Select>
            </div>
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
              <p>Senha para sua conta na plataforma.</p>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="code">C??digo de verifica????o:</label>
              <p>
                Este ?? o seu c??digo de verifica????o de terceiros das
                configura????es do cliente do League of Legends.
              </p>
              <Input
                id="code"
                type="password"
                value={verificationCode}
                error={errorName === 'InvalidVerificationCode'}
                onChange={(event) => setVerificationCode(event.target.value)}
              />
              <a href="#top" target="_blank" rel="noopener noreferrer">
                Como fa??o para definir meu c??digo de verifica????o?
              </a>
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
