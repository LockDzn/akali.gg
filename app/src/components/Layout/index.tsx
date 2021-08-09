import { Container } from './styles'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

type Props = {
  children: React.ReactNode
}

export function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
      <div className="app">
        <section>
          <Sidebar />
          {children}
        </section>
      </div>
    </Container>
  )
}
