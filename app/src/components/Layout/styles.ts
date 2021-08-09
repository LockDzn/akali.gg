import styled from 'styled-components'

export const Container = styled.div`
  .app {
    display: flex;
    height: calc(100vh - 50px);

    section {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 4fr;
      /* gap: 10rem; */
    }
  }
`
