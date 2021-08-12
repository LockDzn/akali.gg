import { useParams } from 'react-router-dom'
import { Container } from './styles'

interface ParamsProps {
  name: string
  tab?: string
}

export function User() {
  const { name, tab = 'home' } = useParams() as ParamsProps
  return (
    <Container>
      <h1>{name}</h1>
      <h1>{tab}</h1>
    </Container>
  )
}
