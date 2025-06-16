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
import BackLabels from "./BackLabels";

const AddLabelsForm = (props) => {
  const [showBack, setShowBack] = useState(false);
  const [hovered, setHovered] = useState({
    front: false,
    back: false,
  });

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

  const frontLabelBtnStyles = !showBack
    ? {
        backgroundColor: "#536F5C",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        transition: "background-color 0.3s ease",
      }
    : undefined;

  const backLabelBtnStyles = showBack
    ? {
        backgroundColor: "#536F5C",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        transition: "background-color 0.5s ease",
      }
    : undefined;

  const handleMouseEnter = (name) => {
    setHovered((prev) => ({ ...prev, [name]: true }));
  };

  const handleMouseLeave = (name) => {
    setHovered((prev) => ({ ...prev, [name]: false }));
  };

  const getTextStyle = (name) => {
    if (showBack && name === "back") return {};
    if (!showBack && name === "front") return {};

    return {
      color: hovered[name] ? "#000" : "#fff",
      cursor: "pointer",
      transition: "color 0.3s ease",
    };
  };

  return (
    <Container className={styles.AddLabelForm}>
        <div>
          <h1 className="text-white my-4">Add Labels</h1>
          <p className="mx-3 fst-italic text-body-secondary text-left text-start">
            Toggle between 'Front Labels' and 'Back Labels' to select desired
            labels
          </p>
          <ul className="mx-3 mb-4 fst-italic text-body-secondary text-left text-start">
            <li>Present labels should be highlighted green.</li>
            <li>Missing labels should remain black.</li>
            <li>Ensure to click 'Save' prior to toggling between labels.</li>
          </ul>
        </div>
        <Container className="text-white d-flex justify-content-around g-0">
          <div
            onMouseEnter={() => handleMouseEnter("front")}
            onMouseLeave={() => handleMouseLeave("front")}
            onClick={handleToggle}
            style={frontLabelBtnStyles}
            data-name="front"
            className={`w-50 p-2`}
          >
            <h2 style={getTextStyle("front")}>Front Labels</h2>
          </div>
          <div
            onMouseLeave={() => handleMouseLeave("back")}
            onMouseEnter={() => handleMouseEnter("back")}
            onClick={handleToggle}
            style={backLabelBtnStyles}
            data-name="back"
            className="w-50 p-2"
          >
            <h2 style={getTextStyle("back")}>Back Labels</h2>
          </div>
        </Container>
        {showBack ? (
          <BackLabels buttons={buttons} showBack={showBack} />
        ) : (
          <FrontLabels buttons={buttons} showBack={showBack} />
        )}
    </Container>
  );
};

export default AddLabelsForm;
