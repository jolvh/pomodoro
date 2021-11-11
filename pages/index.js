import { Container } from '@chakra-ui/react'

import Pomodoro from '../components/pomodoro'

export default function Home() {
  return (
    <Container maxW="container.lg">
      <Pomodoro />
    </Container>
  )
}
