import { Container } from './styles'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'

type Props = {
  children: React.ReactNode
  disableSidebar?: boolean
}

export function Layout({ children, disableSidebar = false }: Props) {
  return (
    <Container disableSidebar={disableSidebar}>
      <Header />
      <div className="app">
        <section>
          <Sidebar hide={disableSidebar} />
          {children}
        </section>
      </div>
    </Container>
  )
}
