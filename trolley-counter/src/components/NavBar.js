import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Stats</Nav.Link>
            <NavDropdown title="Trollies" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Front Labels</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Back Labels
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Missing Labels</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
