import styled from 'styled-components'

interface ContainerProps {
  hide?: boolean
}

export const Container = styled.div<ContainerProps>`
  background: ${(props) => props.theme.color.black};

  height: 100%;
  width: ${(props) => (!props.hide ? `18rem` : `0`)};

  overflow-y: scroll;

  transition: all 300ms ease-in;

  .header {
    display: flex;
    background: ${(props) => props.theme.color.blackBackground};
    margin: 1rem 0;

    cursor: pointer;

    svg {
      width: 28px;
      height: 28px;
    }

    strong {
      font-size: 24px;
    }

    .seleted {
      width: 8px;
      background: ${(props) => props.theme.color.pink};
      margin-right: 1rem;

      border-radius: 0px 2px 2px 0px;
    }

    .title {
      display: flex;
      align-items: center;
      gap: 1rem;

      padding: 0.5rem 0;
    }

    &:hover {
      filter: brightness(1.1);
    }
  }
`

export const Section = styled.div`
  margin-top: 2rem;

  .label {
    display: flex;
    align-items: center;

    padding: 0.6rem 1rem 0.6rem 1rem;

    font-size: 16px;
    text-transform: uppercase;
    font-weight: 700;

    filter: brightness(0.5);
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      filter: brightness(1);
    }
  }
`

export const Games = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

export const Game = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem 0 2rem;

  filter: brightness(0.8);
  cursor: pointer;

  .info {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    img {
      width: 32px;
    }

    p {
      font-size: 14px;
    }
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${(props) => props.theme.color.blackBackground};
    filter: brightness(1);
  }
`
