import { useState } from 'react'
import { Button } from '../../components/Button'

import { Container, Input, Select } from './styles'

import LolLogo from '../../assets/lol-logo.png'
import api from '../../services/api'

interface FromErrorsProps {
  server: boolean
  name: boolean
  code: boolean
  password: boolean
}

export function CreateAccount() {
  const [server, setServer] = useState('br')
  const [summonerName, setSummonerName] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [password, setPassword] = useState('')

  const [fromLoading, setFromLoading] = useState(false)

  const [fromErrors, setFromErrors] = useState<FromErrorsProps>({
    server: false,
    name: false,
    code: false,
    password: false,
  })

  async function handleCreateAccount(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fromLoading) return

    setFromLoading(true)

    try {
      const response = await api.post('/user', {
        server,
        summonerName,
        verificationCode,
        password,
      })

      console.log(response.data)
    } catch (error) {
      const response = error.response.data

      if (response.name === 'InvalidVerificationCode') {
        setFromErrors({
          server: false,
          name: false,
          code: true,
          password: false,
        })
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
              <label htmlFor="code">Código de verificação:</label>
              <p>
                Este é o seu código de verificação de terceiros das
                configurações do cliente do League of Legends.
              </p>
              <Input
                id="code"
                type="password"
                value={verificationCode}
                error={fromErrors.code}
                onChange={(event) => setVerificationCode(event.target.value)}
              />
              <a href="#top" target="_blank" rel="noopener noreferrer">
                Como faço para definir meu código de verificação?
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
