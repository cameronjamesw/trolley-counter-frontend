import React from "react";
import { Container, Row } from "react-bootstrap";
import TrolleyIndex from "../components/TrolleyIndex";
import TrolleyInfo from "../components/TrolleyInfo";
import PinnedTrollies from "../components/PinnedTrollies";
import RecentTrollies from "../components/RecentTrollies";
import styles from "../styles/HomePage.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const HomePage = () => {
  const currentUser = useCurrentUser();
  return (
    <Container>
      <TrolleyIndex />
      <TrolleyInfo />
      {currentUser && (
        <Row className="d-flex justify-content-between g-0">
          <PinnedTrollies />
          <RecentTrollies />
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
