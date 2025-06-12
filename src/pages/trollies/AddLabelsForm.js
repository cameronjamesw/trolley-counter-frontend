import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/AddLabelForm.module.css";

const AddLabelsForm = () => {
  return (
    <Form className={styles.AddLabelForm}>
      <Container className="text-white">
        <Row className="d-flex justify-content-evenly">
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>1 of 2</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>2 of 2</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>2 of 2</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>2 of 2</Col>
        </Row>
        <Row className="d-flex justify-content-evenly">
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>1 of 3</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>2 of 3</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>3 of 3</Col>
          <Col xs={5} lg={2} className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}>2 of 2</Col>
        </Row>
      </Container>
    </Form>
  );
};

export default AddLabelsForm;
