import React, { useState } from "react";
import { Container, Alert } from "react-bootstrap";
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
import { useTrolleyForm } from "../../contexts/TrolleyFormContext";

const AddLabelsForm = (props) => {
  // Defines the state of the label context
  const [showBack, setShowBack] = useState(false);

  // Defines the state of the label buttons
  const [hovered, setHovered] = useState({
    front: false,
    back: false,
  });

  // Destructures variables from TrolleyFormContext
  const { show, setShow} = useTrolleyForm();

  /**
   * This function handles the toggle between the front and back
   * labels component. Through using the showBack variable, the
   * handleToggle function determines which set of buttons to
   * display to the user.
   * 
   * @param {*} event 
   */
  const handleToggle = (event) => {
    event.currentTarget.dataset.name == "front"
      ? setShowBack(false)
      : setShowBack(true);
  };

  /**
   * These are the FontAwesome icons displayed to the user, grouped within
   * an array. A conditional statement is used to determine how many
   * icons should be displayed to the user based on the totes_count prop.
   */
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

  /**
   * These styles refer to the buttons displayed within the
   * Front Labels component. They are conditionally rendered based
   * on the showBack variable.
   */
  const frontLabelBtnStyles = !showBack
    ? {
        backgroundColor: "#536F5C",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        transition: "background-color 0.3s ease",
      }
    : undefined;

    /**
   * These styles refer to the buttons displayed within the
   * Back Labels component. They are conditionally rendered based
   * on the showBack variable.
   */
  const backLabelBtnStyles = showBack
    ? {
        backgroundColor: "#536F5C",
        borderTopLeftRadius: "30px",
        borderTopRightRadius: "30px",
        transition: "background-color 0.5s ease",
      }
    : undefined;

  /**
   * This function handles the event of when the mouse enters each
   * button element. In doing so, it sets the Hovered variable to 'true',
   * adding the required style to the button element.
   * @param {*} name 
   */
  const handleMouseEnter = (name) => {
    setHovered((prev) => ({ ...prev, [name]: true }));
  };

   /**
   * This function handles the event of when the mouse leaves each
   * button element. In doing so, it sets the Hovered variable to 'false',
   * removing the required style from the button element.
   * @param {*} name 
   */
  const handleMouseLeave = (name) => {
    setHovered((prev) => ({ ...prev, [name]: false }));
  };

/**
 * This function defines text style of the h2 elements through two variables. ShowBack
 * and a name variable, either being 'front' or 'back'. The style reflects the state of
 * the component to provide a dynamic feel to the user.
 * 
 * @param {*} name 
 * @returns 
 */
  const getTextStyle = (name) => {
    // If showback and 'back' are true, the h2 element is not effected
    if (showBack && name === "back") return {};

    // If showback and 'back' are false, the h2 element, again, is not effected
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

      {show && (
        <Alert className="mt-3" variant="danger" onClose={() => setShow(false)} dismissible>
          Whoops! You didn't save your labels...
        </Alert>
      )}
    </Container>
  );
};

export default AddLabelsForm;
