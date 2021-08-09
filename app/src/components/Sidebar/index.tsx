import { useHistory } from 'react-router-dom'

import {
  MdGames,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
  MdPlayArrow,
} from 'react-icons/md'

import { Container, Section, Games, Game } from './styles'

import LolBanner from '../../assets/lol-banner.jpg'
import { useState } from 'react'

export function Sidebar() {
  const [createRoomSection, setCreateRoomSection] = useState(true)
  const history = useHistory()

  function openOrCloseCreateRoomSection() {
    setCreateRoomSection(!createRoomSection)
  }

  function navigate(to: string) {
    history.push(to)
  }

  return (
    <Container>
      <div className="header">
        <div className="seleted"></div>
        <div className="title">
          <MdGames />
          <strong>Jogar</strong>
        </div>
      </div>

      <Section>
        <p className="label" onClick={openOrCloseCreateRoomSection}>
          {createRoomSection ? (
            <MdKeyboardArrowDown />
          ) : (
            <MdKeyboardArrowRight />
          )}
          Criação de partida
        </p>
        {createRoomSection && (
          <Games>
            <Game onClick={() => navigate('/create-match/summonersrift5v5')}>
              <div className="info">
                <img src={LolBanner} alt="League of Legends banner" />
                <p>Summoner's Rift 5v5</p>
              </div>
              <MdPlayArrow />
            </Game>
            <Game onClick={() => navigate('/create-match/howlingabyss5v5')}>
              <div className="info">
                <img src={LolBanner} alt="League of Legends banner" />
                <p>Howling Abyss 5v5</p>
              </div>
              <MdPlayArrow />
            </Game>
          </Games>
        )}
      </Section>
    </Container>
  )
}
