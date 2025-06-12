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
import FrontLabels from "./FrontLabels";
import BackLabels from "./FrontLabels";

const AddLabelsForm = (props) => {
  const [showBack, setShowBack] = useState(false);

  const handleToggle = (event) => {
    event.currentTarget.dataset.name == "front"
      ? setShowBack(false)
      : setShowBack(true);
  };

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

  return (
    <Form className={styles.AddLabelForm}>
      <h1 className="text-white my-4">Add Labels</h1>
      <Container className="text-white d-flex justify-content-around g-0">
        <div
          onClick={handleToggle}
          data-name="front"
          className={`w-50 ${styles.LabelsDiv}`}
        >
          <h2>Front Labels</h2>
        </div>
        <div onClick={handleToggle} data-name="back" className="w-50">
          <h2>Back Labels</h2>
        </div>
      </Container>
      {showBack ? (
        <BackLabels buttons={buttons} />
      ) : (
        <FrontLabels buttons={buttons} />
      )};
    </Form>
  );
};

export default AddLabelsForm;
