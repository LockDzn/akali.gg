import { Container, Main, Presentation, Duel, PlayerCard } from './styles'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

import AkaliIcon from '../../assets/icons/akali.png'
import LeonaIcon from '../../assets/icons/leona.png'
import MoraganaIcon from '../../assets/icons/morgana.png'
import EzrealIcon from '../../assets/icons/ezreal.png'

export function Index() {
  return (
    <Container>
      <Header />
      <Main>
        <section className="frist">
          <strong>id nibh tortor id aliquet lectus proin!</strong>
          <p>
            Jogue com mais de <span>mil pessoas</span> em ligas e torneios.
          </p>

          <Button>Cadastre-se</Button>
        </section>
        <section className="secondary">
          <Presentation>
            <Duel>
              <div className="teamA">
                <PlayerCard>
                  <img src={AkaliIcon} alt="Akali" />
                  <span className="name">You</span>
                  <span className="level">Lv. 8</span>
                </PlayerCard>
                <PlayerCard>
                  <img src={LeonaIcon} alt="Leona" />
                  <span className="name">Leona9</span>
                  <span className="level">Lv. 7</span>
                </PlayerCard>
              </div>
              <span className="vs">VS</span>
              <div className="teamB">
                <PlayerCard>
                  <img src={MoraganaIcon} alt="Morgana" />
                  <span className="name">Enemy 1</span>
                  <span className="level">Lv. 7</span>
                </PlayerCard>
                <PlayerCard>
                  <img src={EzrealIcon} alt="Ezreal" />
                  <span className="name">Enemy 2</span>
                  <span className="level">Lv. 9</span>
                </PlayerCard>
              </div>
            </Duel>
            <div className="bar"></div>
            <div className="text">
              <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Expedita necessitatibus assumenda nobis fuga. Quo, doloremque?
                Ipsum illo ducimus nulla voluptate assumenda eveniet corrupti
                aliquam, officia voluptates rem, voluptatum fugit autem?
              </p>
            </div>
          </Presentation>
        </section>
      </Main>
    </Container>
  )
}
