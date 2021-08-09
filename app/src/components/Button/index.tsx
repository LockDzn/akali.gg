import { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  opaque?: boolean
  children?: React.ReactNode
}

export function Button({ children, opaque = false, ...props }: ButtonProps) {
  return (
    <Container opaque={opaque} {...props}>
      {children}
    </Container>
  )
}
