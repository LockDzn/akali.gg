import styled from 'styled-components'

type ButtonProps = {
  opaque: boolean
}

export const Container = styled.button<ButtonProps>`
  border: 0;
  border-radius: 2px;

  height: 32px;
  width: auto;
  padding: 0 0.6rem;

  font-size: 15px;
  text-align: center;
  white-space: nowrap;

  ${(props) => {
    if (props.opaque) {
      return `
        background: ${props.theme.color.blackBackground};
        color: ${props.theme.color.white};
        border: 1px solid ${props.theme.color.graySecondary};
      `
    } else {
      return `
        background: ${props.theme.color.pink};
        color: ${props.theme.color.white};
      `
    }
  }}

  &:hover {
    filter: brightness(1.3);
  }

  &:disabled {
    filter: brightness(0.5);
    cursor: not-allowed;
  }

  transition: all 300ms ease-in;
`
