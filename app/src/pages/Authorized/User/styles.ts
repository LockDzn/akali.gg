import styled from 'styled-components'

export const Container = styled.div``

export const UserCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .start {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  background: ${(props) => props.theme.color.graySecondary};
  padding: 2rem;

  .userIcon {
    width: 98px;
    border-radius: 50%;
  }
`

export const UserInformation = styled.div``

export const Nav = styled.nav`
  ul {
    display: flex;
    gap: 2rem;
    list-style-type: none;
    padding: 0 0.8rem;
  }
`
interface LiLinkProps {
  seleted: boolean
}

export const LiLink = styled.li<LiLinkProps>`
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;

  padding: 0.8rem 0;

  ${(props) =>
    props.seleted &&
    `
  color: ${props.theme.color.pink};
  border-bottom: 2px solid ${props.theme.color.pink};
  `}
`

export const Home = styled.div``
