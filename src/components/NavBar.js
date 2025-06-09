import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const navigate = useNavigate();

  // const handleSignOut = async () => {
  //   try {
  //     await axiosReq.post("/dj-rest-auth/logout/");
  //     setCurrentUser(null);
  //     removeTokenTimestamp();
  //     navigate('/sign-in/');

  //     // Optional: clean up localStorage
  //     localStorage.removeItem("access");
  //     localStorage.removeItem("refresh");
  //     localStorage.removeItem("tokenTimestamp");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //   }
  // };

  const loggedInIcons = (
    <>
      <Nav.Link href="#link">Stats</Nav.Link>
      <Nav.Link>Sign Out</Nav.Link>
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
    <Navbar data-bs-theme="dark" expand="lg" className={styles.NavBar}>
      <Container>
        <Navbar.Brand href="#home">Trolley Counter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
