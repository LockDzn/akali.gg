import { Container } from './styles'

interface Props {
  name: string
  width: number
  height: number
}

export function NoProfileImage({ name, width, height }: Props) {
  return (
    <Container width={width} height={height}>
      <span>{name.charAt(0).toLocaleUpperCase()}</span>
    </Container>
  )
}
