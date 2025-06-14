import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTrolleyForm } from "../../contexts/TrolleyFormContext";
import { handleLocalStorage } from "../../utils/utils"
import styles from "../../styles/Label.module.css";

const FrontLabels = ({ buttons, showBack }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const { updateAllLabels } = useTrolleyForm();

  const toggleSelection = (index) => {
    setSelectedIndices((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Deselect if already selected
        handleLocalStorage(prevSelected, index, 'back');
        return prevSelected.filter((i) => i !== index);
      } else {
        // Select if not already selected
        handleLocalStorage(prevSelected, index, 'back');
        return [...prevSelected, index];
      }
    });
  };

  const handleMount = async () => {
    buttons.map((label, index) => {
      const currentlySelected = localStorage.getItem(`back-${index}-btnIndex`);
      currentlySelected ? setSelectedIndices((prev) => [...prev, index]) : null;
    });
  };

  useEffect(() => {
    handleMount();
  }, [showBack]);

  const appendBtns = () => {
    const btns = buttons.map((label, index) => {
      const isSelected = selectedIndices.includes(index);
      return {
        shape: `${index + 1}`,
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
