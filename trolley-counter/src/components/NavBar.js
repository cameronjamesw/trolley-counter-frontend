import React from 'react'
import { Navbar, Container } from 'react-bootstrap'

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">This is the navbar!!</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar