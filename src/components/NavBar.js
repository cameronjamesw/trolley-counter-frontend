import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar
    data-bs-theme="dark"
    expand="lg" 
    className={styles.NavBar}>
      <Container>
        <Navbar.Brand href="#home">Trolley Counter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" >Home</Nav.Link>
            <Nav.Link href="#link">Stats</Nav.Link>
            <Nav.Link as={NavLink} to="/sign-in/">Sign In</Nav.Link>
            <Nav.Link as={NavLink} to="/sign-up/">Sign Up</Nav.Link>
            <Nav.Link>Sign Out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
