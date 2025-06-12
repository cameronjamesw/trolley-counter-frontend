import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styles from '../../styles/AddLabelForm.module.css';

const FrontLabels = ({buttons}) => {
    const [selectedIndices, setSelectedIndices] = useState([]);

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
  )
}

export default FrontLabels
