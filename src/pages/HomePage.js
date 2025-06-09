import React from 'react'
import { Container } from 'react-bootstrap'
import TrolleyIndex from '../components/TrolleyIndex'
import TrolleyInfo from '../components/TrolleyInfo'

const HomePage = () => {
  return (
    <Container>
        < TrolleyIndex />
        < TrolleyInfo />
    </Container>
  )
}

export default HomePage
