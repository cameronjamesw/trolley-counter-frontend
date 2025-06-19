import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TrolleyDetail.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { useMediaQuery } from "react-responsive";

const TrolleyDetail = () => {
  const [trolley, setTrolley] = useState({});
  const { id } = useParams();

  const currentUser = useCurrentUser();

  useRedirect(!currentUser ? "loggedIn" : "loggedOut");

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const {
    creator,
    totes_count,
    notes,
    in_use,
    created_at,
    updated_at,
    missing_back_labels,
    missing_front_labels,
  } = trolley;

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
        <Col xs={12} md={{ span: 5 }} className={`${styles.Div} d-flex flex-column justify-content-evenly`}>
          <h1 className="text-white p-2">Key Info</h1>
          <p className={styles.Info}>Trolley Number: {trolley.id}</p>
          <p className={styles.Info}>Creator: {creator}</p>
          <p className={styles.Info}>In Use: {in_use ? "Yes" : "No"}</p>
          {notes && <p className={styles.Info}>Notes: {notes}</p>}
          <p className={styles.Info}>
            Totes Count: {totes_count === "Ten Totes" ? "10" : "8"}
          </p>
          <p className={styles.Info}>Created At: {created_at}</p>
          <p className={styles.Info}>Last Updated: {updated_at}</p>
        </Col>
        <Col xs={12} md={{ span: 5, offset: 2 }}>
          <Row className={`d-flex justify-content-evenly text-center mb-3 ${styles.Div} ${isMobile && 'mt-4 mb-2'}`}>
            <h1 className="text-white p-3">Missing Front Labels</h1>
            {Array.isArray(missing_front_labels) &&
              missing_front_labels.map((label, idx) => (
                <Col xs={10} sm={3} lg={5} className={styles.Info} key={idx}>
                  {label}
                </Col>
              ))}
          </Row>
          <Row className={`d-flex justify-content-evenly text-center mt-3 ${styles.Div} ${isMobile && 'mt-4 mb-2'}`}>
            <h1 className="text-white p-3">Missing Back Labels</h1>
            {Array.isArray(missing_back_labels) &&
              missing_back_labels.map((label, idx) => (
                <Col xs={10} sm={3} lg={5} className={styles.Info} key={idx}>
                  {label}
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default TrolleyDetail;
