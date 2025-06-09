import React from "react";
import { Container } from "react-bootstrap";
import styles from "../styles/TrolleyInfo.module.css";

const TrolleyInfo = () => {
  return (
    <Container className={`mt-5 ${styles.Main}`}>
      <h1 className="pt-3">About the Trolley Counter App</h1>
      <p className="p-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </Container>
  );
};

export default TrolleyInfo;
