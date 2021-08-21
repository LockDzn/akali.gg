import React from 'react'
import { Container } from './styles'

import LoadingSvg from '../../assets/loading.svg'

export function Loading() {
  return (
    <Container>
      <img src={LoadingSvg} alt="Loading" />
    </Container>
  )
}
