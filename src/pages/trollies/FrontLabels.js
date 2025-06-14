import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Label.module.css";

const BackLabels = ({ buttons, showBack }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [selectedBtns, setSelectedBtns] = useState([]);

  const toggleSelection = (index) => {
    setSelectedIndices((prevSelected) => {
      if (prevSelected.includes(index)) {
        // Deselect if already selected
        handleLocalStorage(prevSelected, index);
        return prevSelected.filter((i) => i !== index);
      } else {
        // Select if not already selected
        handleLocalStorage(prevSelected, index);
        return [...prevSelected, index];
      }
    });
  };

  function handleLocalStorage(prev, index) {
    if (prev.includes(index)) {
      console.log("...removing item from local storage");
      localStorage.removeItem(`front-${index}-btnIndex`);
    } else {
      console.log("...creating item in local storage");
      localStorage.setItem(`front-${index}-btnIndex`, index);
    }
  }

  const handleMount = async () => {
    buttons.map((label, index) => {
      const currentlySelected = localStorage.getItem(`front-${index}-btnIndex`);
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

    console.log("Generated Button Objects:", btns);
    setSelectedBtns(btns);
  };

  return (
    <Container className="text-white">
      <Row
        gap={3}
        className={`d-flex justify-content-evenly ${styles.LabelsDiv}`}
      >
        {buttons.map((label, index) => {
          let isSelected = selectedIndices.includes(index);

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

export default BackLabels;
