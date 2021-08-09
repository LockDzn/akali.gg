import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  align-items: center;
  height: 50px;

  background: ${(props) => props.theme.color.black};
  border-bottom: 1px solid ${(props) => props.theme.color.graySecondary};
`

export const Authenticated = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 0 4rem;

  .logo {
    h1 {
      font-size: 22px;
    }
  }

  .session {
    display: flex;
    align-items: center;
    gap: 1rem;

    border-radius: 30px 4px 4px 30px;
    background: ${(props) => props.theme.color.blackBackground};

    span {
      font-size: 16px;
    }

    .bar {
      width: 1px;
      height: 30px;
      background: ${(props) => props.theme.color.graySecondary};
    }

    .account {
      cursor: pointer;
      .user {
        display: flex;
        align-items: center;
        gap: 1rem;

        img {
          width: 38px;
          border-radius: 38px;
          border: 2px solid ${(props) => props.theme.color.pink};
        }
      }

      &:hover .user-dropdown {
        display: block;
      }

      .user-dropdown {
        display: none;
        position: absolute;

        background: ${(props) => props.theme.color.black};
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

        min-width: 160px;
        z-index: 1;

        button {
          border: 0;
          background: transparent;
          color: ${(props) => props.theme.color.white};

          font-weight: 400;
          text-align: start;

          padding: 12px 16px;
          width: 100%;

          filter: brightness(0.8);

          &:disabled {
            filter: brightness(0.5);
            cursor: not-allowed;

            &:hover {
              filter: brightness(0.5);
            }
          }

          &:hover {
            filter: brightness(1);
          }
        }
      }
    }

    .actions {
      margin-right: 1rem;

      svg {
        margin: 0 0.2rem;
        width: 24px;
        height: 24px;

        cursor: pointer;
      }
    }
  }
`

export const Unauthenticated = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  padding: 0 4rem;

  .logo {
    h1 {
      font-size: 22px;
    }
  }

  .session {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
      font-size: 16px;
    }

    .account {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        width: 38px;
        border-radius: 38px;
        border: 2px solid ${(props) => props.theme.color.pink};
      }
    }
  }
`
