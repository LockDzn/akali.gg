import styled from 'styled-components'

import AkaliImage from '../../assets/akali-background.jpg'

export const Container = styled.div``

export const Main = styled.main`
  section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5rem;
    text-align: center;

    height: 100vh;

    strong {
      font-size: 2.8rem;
      margin-bottom: 0.8rem;
      margin-top: 2.8rem;
    }

    p {
      font-size: 1.8rem;
      margin-bottom: 2.8rem;

      span {
        color: ${(props) => props.theme.color.pink};
      }
    }
  }

  section.frist {
    height: calc(100vh - 50px);

    background: linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.72)),
      url(${AkaliImage});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
`

export const Presentation = styled.div`
  display: flex;
  align-items: center;
  gap: 4rem;

  margin: 2rem 0;

  .bar {
    width: 5px;
    height: 100%;
    background: ${(props) => props.theme.color.graySecondary};
  }

  .text {
    text-align: start;

    h2 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      font-size: 18px;
      margin: 0;
    }
  }
`

export const Duel = styled.div`
  height: 258px;
  display: flex;

  .teamA {
    align-self: flex-start;
  }
  .teamB {
    align-self: flex-end;
  }

  .vs {
    font-size: 28px;
    font-weight: 700;

    align-self: center;
  }
`

export const PlayerCard = styled.div`
  display: flex;
  align-items: center;

  background: ${(props) => props.theme.color.black};

  padding: 0.4rem;
  border-radius: 2px;

  white-space: nowrap;
  margin-bottom: 0.5rem;

  img {
    width: 42px;
  }

  .name {
    font-weight: 700;
    margin: 0 0.8rem;
  }

  .level {
    font-size: 14px;
    margin-left: 0.8rem;
  }
`
