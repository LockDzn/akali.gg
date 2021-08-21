import styled from 'styled-components'

interface ContainerProps {
  width: number
  height: number
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 50%;

  background: ${(props) => props.theme.color.pink};

  span {
    font-weight: 700;
    font-size: 32px;
    text-align: center;
  }
`
