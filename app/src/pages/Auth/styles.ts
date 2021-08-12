import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;

  border-radius: 8px;

  .login {
    padding: 2rem;
    background: ${(props) => props.theme.color.black};

    .flex-center {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      text-align: center;
      font-size: 28px;
      margin-bottom: 1rem;
    }

    img {
      width: 150px;
      margin-bottom: 1rem;
    }

    form {
      .actions {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        min-width: 120px;
      }

      .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;

        label {
          font-size: 16px;
          margin-bottom: 0.5rem;
        }

        p {
          max-width: 20rem;
          font-size: 12px;
          color: ${(props) => props.theme.color.gray};
          margin-bottom: 0.5rem;
        }

        a {
          font-size: 14px;
          color: ${(props) => props.theme.color.white};
          margin-top: 0.5rem;

          &:hover {
            color: ${(props) => props.theme.color.pink};
          }

          transition: all 300ms ease-in;
        }
      }
    }
  }
`

type InputProps = {
  error?: boolean
}

export const Input = styled.input<InputProps>`
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.blackBackground};

  ${(props) => {
    if (props.error) {
      return `border: 1px solid red;`
    } else {
      return `border: 1px solid ${props.theme.color.graySecondary};`
    }
  }}

  border-radius: 2px;

  padding: 0.4rem;
`

export const Select = styled.select`
  color: ${(props) => props.theme.color.white};
  background: ${(props) => props.theme.color.blackBackground};

  border: 1px solid ${(props) => props.theme.color.graySecondary};
  border-radius: 2px;

  padding: 0.4rem;
`
