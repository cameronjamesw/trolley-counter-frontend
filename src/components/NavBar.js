import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";
import CurrentDate from "./CurrentDate";
import useClickOutsideToggle from "../hooks/clickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleLogout = () => {
    // Clear user from context
    setCurrentUser(null);

    // Remove tokens
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    // Remove token timestamp
    removeTokenTimestamp();

    // Optionally, navigate to the login page or home
    navigate("/sign-in");
  };

  const loggedInIcons = (
    <>
      <Nav.Link href="#link">Stats</Nav.Link>
      <Nav.Link onClick={handleLogout}>Sign Out</Nav.Link>
    </>
  );

  const loggedOutIcons = (
    <>
      <Nav.Link as={NavLink} to="/sign-in/">
        Sign In
      </Nav.Link>
      <Nav.Link as={NavLink} to="/sign-up/">
        Sign Up
      </Nav.Link>
    </>
  );
  return (
    <Navbar
      expanded={expanded}
      data-bs-theme="dark"
      expand="lg"
      className={styles.NavBar}
    >
      <Container>
        <Navbar.Brand href="#home">Trolley Counter</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setExpanded(!expanded)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
        {currentUser && (
          <span className={`d-none d-lg-block ${styles.Link}`}>
            <p>Welcome back, {currentUser?.username}!</p>
          </span>
        )}
        <span className={`d-none d-lg-block ${styles.Link}`}>
          <CurrentDate />
        </span>
      </Container>
    </Navbar>
  );
};

export default NavBar;
