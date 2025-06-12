import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/AddLabelForm.module.css";

const AddLabelsForm = () => {

  return (
    <Form className={styles.AddLabelForm}>
      <Container className="text-white">
        <Row className="d-flex justify-content-evenly">
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            1 of 2
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            2 of 2
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            2 of 2
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            2 of 2
          </Col>
        </Row>
        <Row className="d-flex justify-content-evenly">
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            1 of 3
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            2 of 3
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            3 of 3
          </Col>
          <Col
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#2e2e2e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#3d3d3d";
            }}
            style={{
              backgroundColor: "#3d3d3d",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            xs={5}
            lg={2}
            className={`align-content-center offset-xs-1 offset-lg-1 ${styles.Label}`}
          >
            2 of 2
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default AddLabelsForm;
