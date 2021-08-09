import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme.color.blackBackground};
    color: ${(props) => props.theme.color.white};
    font: 400 16px 'Play', sans-serif;
  }

  button, textarea, input, select, option {
    font: 400 16px 'Play', sans-serif;
  }

  button {
    font-weight: 700;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.color.graySecondary};
    border-radius: 2px;
  }
`
