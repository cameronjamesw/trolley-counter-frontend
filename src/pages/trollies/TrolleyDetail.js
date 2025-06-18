import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TrolleyDetail.module.css";

const TrolleyDetail = () => {
  const [trolley, setTrolley] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchTrolley = async () => {
      try {
        const { data } = await axiosReq.get(`/api/trolleys/${id}/`);
        console.log(data);
        setTrolley(data);
      } catch (err) {
        console.log(err?.response.data);
      }
    };

    fetchTrolley();
  }, []);
  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} md={{ span: 5 }} className={`${styles.Div}`}>
          Trolley Info Window
        </Col>
        <Col xs={12} md={{ span: 5, offset: 2 }}>
          <Row className={`text-center mb-3 ${styles.Div}`}>
            <Col>Missing Front Labels</Col>
          </Row>
          <Row className={`text-center mt-3 ${styles.Div}`}>
            <Col>Missing Back Labels</Col>
          </Row>
        </Col>
      </Row>
      <h1>Trolley Detail Window!</h1>
      <p>Trolley Number: {trolley.id}</p>
      <p>Creator: {trolley.creator}</p>
      <p>Totes: {trolley.totes_count}</p>
      <p>Front Labels Count: {trolley.front_label_count}</p>
      <p>Back Labels Count: {trolley.back_label_count}</p>
      <p>Missing Front Labels: {trolley.missing_front_labels}</p>
    </Container>
  );
};

export default TrolleyDetail;
