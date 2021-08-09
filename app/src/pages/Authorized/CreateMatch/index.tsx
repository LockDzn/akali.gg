import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { Layout } from '../../../components/Layout'

import { Container, Role, Roles, QueueList, Button } from './styles'

import TopIcon from '../../../assets/roles/top.png'
import JungleIcon from '../../../assets/roles/jungle.png'
import MidIcon from '../../../assets/roles/mid.png'
import BotIcon from '../../../assets/roles/bot.png'
import SupportIcon from '../../../assets/roles/support.png'
import { useEffect } from 'react'

type ParamsProps = {
  id: string
}

export function CreateMatch() {
  const [role, setRole] = useState('')
  const [roleWasSelected, setRoleWasSelected] = useState(false)
  const [inQueue, setInQueue] = useState(false)

  const { id } = useParams() as ParamsProps

  useEffect(() => {
    setRole('')
    setRoleWasSelected(false)
    setInQueue(false)
  }, [id])

  function selectRole(role: string) {
    if (inQueue) return false
    setRole(role)
    setRoleWasSelected(true)
  }

  function JoinOrLeaveQueue() {
    setInQueue(!inQueue)
  }

  return (
    <Layout>
      <Container>
        <div className="header">Criar partida {id}</div>
        <Roles inQueue={inQueue}>
          <Role seleted={role === 'top'} onClick={() => selectRole('top')}>
            <img src={TopIcon} alt="Top lane" />
            <span>Top lane</span>
          </Role>
          <Role
            seleted={role === 'jungle'}
            onClick={() => selectRole('jungle')}
          >
            <img src={JungleIcon} alt="Jungle" />
            <span>Jungle</span>
          </Role>
          <Role seleted={role === 'mid'} onClick={() => selectRole('mid')}>
            <img src={MidIcon} alt="Mid lane" />
            <span>Mid lane</span>
          </Role>
          <Role seleted={role === 'bot'} onClick={() => selectRole('bot')}>
            <img src={BotIcon} alt="Bot lane" />
            <span>Bot lane</span>
          </Role>
          <Role
            seleted={role === 'support'}
            onClick={() => selectRole('support')}
          >
            <img src={SupportIcon} alt="Support" />
            <span>Support</span>
          </Role>
        </Roles>
        <QueueList>
          <div className="title">Em fila</div>
          <div className="roles">
            <div className="role">
              <img src={TopIcon} alt="Top lane" />
              <div className="players">
                <p>LoockDzn</p>
                <p>LoockDzn</p>
              </div>
            </div>
            <div className="role">
              <img src={JungleIcon} alt="Jungle" />
              <div className="players">
                <p>LoockDzn</p>
                <p>LoockDzn</p>
              </div>
            </div>
            <div className="role">
              <img src={MidIcon} alt="Mid lane" />
              <div className="players">
                <p>LoockDzn</p>
                <p>LoockDzn</p>
              </div>
            </div>
            <div className="role">
              <img src={BotIcon} alt="Bot lane" />
              <div className="players">
                <p>LoockDzn</p>
                <p>LoockDzn</p>
              </div>
            </div>
            <div className="role">
              <img src={SupportIcon} alt="Support" />
              <div className="players">
                <p>LoockDzn</p>
                <p>LoockDzn</p>
              </div>
            </div>
          </div>
        </QueueList>
        <Button onClick={JoinOrLeaveQueue}>
          {inQueue ? 'Sair na fila' : 'Entrar na fila'}
        </Button>
      </Container>
    </Layout>
  )
}
