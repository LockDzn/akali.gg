import styled from 'styled-components'

interface ContainerProps {
  disableSidebar?: boolean
}

export const Container = styled.div<ContainerProps>`
  .app {
    display: flex;
    height: calc(100vh - 50px);

    section {
      flex: 1;
      display: grid;

      ${(props) =>
        props.disableSidebar
          ? `grid-template-columns: 0fr 1fr;`
          : `grid-template-columns: 1fr 4fr;`}
    }
  }
`
