import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTrolleyForm } from "../../contexts/TrolleyFormContext";
import { handleLocalStorage } from "../../utils/utils";
import styles from "../../styles/Label.module.css";

const FrontLabels = ({ buttons, showBack }) => {
  // Defines variables of the indecies of potentially selected buttons
  const [selectedIndices, setSelectedIndices] = useState([]);

  // Destructures variables and functions from TrolleyContext
  const { updateAllLabels, saveClicked, updateSaveClicked } = useTrolleyForm();
  const {back} = saveClicked;

  /**
   * This function handles each button being toggled.
   * If the back labels have already been saved and another button is clicked,
   * this function resets the saveClicked state to false.
   * 
   * Furthermore, this function also creates an item in localStorage which
   * correlates to the index of the button created. This is important for toggling
   * between the frontLabels and backLabels component ensuring the buttons stay selected
   * between toggles.
   * 
   * Finally, this function checks to see if the passed index, is already in the
   * array of selectedIndecies, if it isn't, it creates an entry, otherwise it
   * removes the entry.
   * 
   * @param {*} index 
   */
  const toggleSelection = (index) => {
    if (back) {
      updateSaveClicked(false, "back");
    }
    setSelectedIndices((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Deselect if already selected
        handleLocalStorage(prevSelected, index, "back");
        return prevSelected.filter((i) => i !== index);
      } else {
        // Select if not already selected
        handleLocalStorage(prevSelected, index, "back");
        return [...prevSelected, index];
      }
    });
  };

  /**
   * This handleMount function retrieves the indecies from localStorage,
   * as referred to earlier, and sets the selectedIndecies accordingly.
   * Buttons return null if their indecies are not in localStorage.
   */
  const handleMount = async () => {
    buttons.map((label, index) => {
      const currentlySelected = localStorage.getItem(`back-${index}-btnIndex`);
      currentlySelected ? setSelectedIndices((prev) => [...prev, index]) : null;
    });
  };

  // Runs handleMount when showBack is toggled.
  useEffect(() => {
    handleMount();
  }, [showBack]);

  /**
   * This function appends the selected buttons to an object,
   * and then passes that object to the updateAllLabels function which
   * is in the TrolleyFormContext.
   * 
   * When this function is called, the saveClicked function is set to true
   * for the "back" key value pair.
   */
  const appendBtns = () => {
    if (!back) {
      updateSaveClicked(true, "back");
    }
    const btns = buttons.map((label, index) => {
      const isSelected = selectedIndices.includes(index);
      return {
        shape: index + 1,
        checked: isSelected,
      };
    });

    updateAllLabels(btns, "back");
  };

  return (
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
        <Row>
          <Col xs={{ span: 6, offset: 3 }}>
            <Button variant="success" className="m-3" onClick={appendBtns}>
              Save
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default FrontLabels;
