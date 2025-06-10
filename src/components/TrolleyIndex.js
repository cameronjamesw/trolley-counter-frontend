import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import styles from "../styles/TrolleyIndex.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const TrolleyIndex = () => {
  const [isHovered, setIsHovered] = useState(false);

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#006400" : "#2d843d",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleClick = () => {
    navigate("/add-trolley/");
  };

  const authIndex = (
    <>
      <Container
        style={buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`d-flex col-2 col-lg-1 mt-4 ${styles.Main} ${styles.IconBox}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon className={styles.Icon} icon={faCartShopping} />
      </Container>
      <Container className={`col-8 col-lg-8 mt-4 ${styles.Main}`}>
        <p className="p-3">Trolley Index</p>
      </Container>
    </>
  );

  const unAuthIndex = (
    <>
      <Container className={`col-lg-8 mt-4 ${styles.Main}`}>
        <p className="p-3">Trolley Index</p>
      </Container>
    </>
  );

  return <Row>{currentUser ? authIndex : unAuthIndex}</Row>;
};

export default TrolleyIndex;
