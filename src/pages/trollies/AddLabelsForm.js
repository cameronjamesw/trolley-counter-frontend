import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/AddLabelForm.module.css";

const AddLabelsForm = () => {
  return (
    <Form className={styles.AddLabelForm}>
      <Container>
        <Row className="g-3">
          <Col className={styles.Label}>1 of 2</Col>
          <Col className={styles.Label}>2 of 2</Col>
          <Col className={styles.Label}>2 of 2</Col>
        </Row>
        <Row>
          <Col className={styles.Label}>1 of 3</Col>
          <Col className={styles.Label}>2 of 3</Col>
          <Col className={styles.Label}>3 of 3</Col>
        </Row>
      </Container>
    </Form>
  );
};

export default AddLabelsForm;
