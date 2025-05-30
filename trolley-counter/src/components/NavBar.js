import React from "react";
import { Navbar, Container, NavLink } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  return (
    <Navbar fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink className={styles.NavLink}>
          <Navbar.Brand>Trolley Counter</Navbar.Brand>
        </NavLink>
      </Container>
    </Navbar>
  );
};

export default NavBar;
