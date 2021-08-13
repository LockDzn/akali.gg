import styled from 'styled-components'

export const HomeContainer = styled.div``

export const FriendsContainer = styled.div`
  margin-top: 1rem;
  padding: 0 1rem;

  nav {
    ul {
      display: flex;
      gap: 1rem;
      list-style: none;

      li {
        padding: 0.6rem 0;
        font-size: 16px;

        cursor: pointer;

        &.seleted {
          border-bottom: 2px solid ${(props) => props.theme.color.pink};
        }
      }
    }
  }

  .list {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;

    margin-top: 1rem;
  }

  .friendCard {
    display: flex;
    align-items: center;
    gap: 1rem;

    background: ${(props) => props.theme.color.black};

    padding: 0.8rem 1rem;

    border-radius: 4px;

    img {
      width: 48px;
      border-radius: 50%;
    }

    .name {
      text-decoration: none;
      color: ${(props) => props.theme.color.white};
      margin-right: 2rem;

      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.color.pink};
      }
    }

    .actions {
      display: flex;
      gap: 0.8rem;
      button {
        font-size: 14px;
      }
    }
  }

  .paddingFriendCard {
    .name {
      margin-right: 1rem;
    }
  }
`

export const HistoricContainer = styled.div``
