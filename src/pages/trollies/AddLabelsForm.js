import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/AddLabelForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faCircle,
  faPlay,
  faPlus,
  faWater,
  faHeart,
  faSeedling,
  faCrow,
} from "@fortawesome/free-solid-svg-icons";

const AddLabelsForm = () => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const buttons = [
    <FontAwesomeIcon icon={faSquare} />,
    <FontAwesomeIcon icon={faCircle} />,
    <FontAwesomeIcon icon={faPlay} />,
    <FontAwesomeIcon icon={faPlus} />,
    <FontAwesomeIcon icon={faWater} />,
    <FontAwesomeIcon icon={faHeart} />,
    <FontAwesomeIcon icon={faSeedling} />,
    <FontAwesomeIcon icon={faCrow} />,
  ];

  const toggleSelection = (index) => {
    setSelectedIndices((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Deselect if already selected
        return prevSelected.filter((i) => i !== index);
      } else {
        // Select if not already selected
        return [...prevSelected, index];
      }
    });
  };

  return (
    <Form className={styles.AddLabelForm}>
      <Container className="text-white">
        <Row gap={3} className="d-flex justify-content-evenly">
          {buttons.map((label, index) => {
            const isSelected = selectedIndices.includes(index);

            const buttonStyle = isSelected
              ? { backgroundColor: "#2d843d" }
              : undefined;

            return (
              <Col
                key={index}
                xs={{ span: 5, offset: 1 }}
                lg={{ span: 4 }}
                className={`mx-1 align-content-center ${styles.Label}`}
                style={buttonStyle}
                onClick={() => toggleSelection(index)}
              >
                {label}
              </Col>
            );
          })}
        </Row>
      </Container>
    </Form>
  );
};

export default AddLabelsForm;
