import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .header {
    font-size: 28px;
    font-weight: 700;

    margin-top: 2rem;
  }
`

type RoleProps = {
  seleted: boolean
}

export const Role = styled.div<RoleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 0.8rem;

  background: ${(props) => props.theme.color.black};
  border-radius: 4px;

  cursor: pointer;

  ${(props) =>
    props.seleted &&
    `
    filter: brightness(1)!important;
    border: 1px solid ${props.theme.color.pink};
  `}

  img {
    width: 78px;
  }

  span {
    font-size: 28px;
    font-weight: 700;
  }
`

type RolesProps = {
  inQueue: boolean
}

export const Roles = styled.div<RolesProps>`
  display: flex;
  gap: 1rem;

  margin-top: 1rem;

  ${(props) =>
    props.inQueue &&
    `
    ${Role} {
      cursor: not-allowed;
      filter: brightness(0.6);
    }
  `}
`

export const QueueList = styled.div`
  background: ${(props) => props.theme.color.black};
  padding: 1rem;
  border-radius: 4px;
  text-align: center;

  .title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .roles {
    display: flex;
    gap: 1rem;

    .role {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      img {
        width: 28px;
        margin-bottom: 0.8rem;
      }

      .players {
      }
    }
  }
`

export const Button = styled.button`
  width: 10rem;
  border: 0;
  border-radius: 4px;

  background: ${(props) => props.theme.color.pink};
  color: ${(props) => props.theme.color.white};

  padding: 1rem;
`
