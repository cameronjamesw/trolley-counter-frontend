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
  faInfinity,
  faPlane,
} from "@fortawesome/free-solid-svg-icons";

const AddLabelsForm = (props) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const buttons =
    props.totes_count === 1
      ? [
          <FontAwesomeIcon icon={faSquare} />,
          <FontAwesomeIcon icon={faCircle} />,
          <FontAwesomeIcon icon={faPlay} />,
          <FontAwesomeIcon icon={faPlus} />,
          <FontAwesomeIcon icon={faWater} />,
          <FontAwesomeIcon icon={faHeart} />,
          <FontAwesomeIcon icon={faSeedling} />,
          <FontAwesomeIcon icon={faCrow} />,
        ]
      : [
          <FontAwesomeIcon icon={faSquare} />,
          <FontAwesomeIcon icon={faCircle} />,
          <FontAwesomeIcon icon={faPlay} />,
          <FontAwesomeIcon icon={faPlus} />,
          <FontAwesomeIcon icon={faWater} />,
          <FontAwesomeIcon icon={faHeart} />,
          <FontAwesomeIcon icon={faSeedling} />,
          <FontAwesomeIcon icon={faCrow} />,
          <FontAwesomeIcon icon={faInfinity} />,
          <FontAwesomeIcon icon={faPlane} />,
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
      <h1 className="text-white my-4">Add Labels</h1>
      <Container className="text-white d-flex justify-content-around g-0">
        <div className={`w-50 ${styles.LabelsDiv}`}>
          <h2>Front Labels</h2>
        </div>
        <div className="w-50">
          <h2>Back Labels</h2>
        </div>
      </Container>
      <Container className="text-white">
        <Row
          gap={3}
          className={`d-flex justify-content-evenly ${styles.LabelsDiv}`}
        >
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
