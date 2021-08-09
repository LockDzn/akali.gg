import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      blackBackground: string
      black: string
      pink: string
      white: string
      gray: string
      graySecondary: string
    }
  }
}

export const theme: DefaultTheme = {
  color: {
    blackBackground: '#1F1F1F',
    black: '#0D0D0D',
    pink: '#F24976',
    white: '#ffffff',
    gray: '#C2C2C2',
    graySecondary: '#404040',
  },
}
