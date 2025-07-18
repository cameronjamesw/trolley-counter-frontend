import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/TrolleyDetail.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { useMediaQuery } from "react-responsive";
import { useLabelShapes } from "../../contexts/LabelShapesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const TrolleyDetail = () => {
  const [trolley, setTrolley] = useState({});
  const [labels, setLabels] = useState({
    front: [],
    back: [],
  });
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  const { id } = useParams();
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const shapeLabels = useLabelShapes();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrolley = async () => {
      try {
        const { data: trolley } = await axiosReq.get(`/api/trolleys/${id}/`);
        const { data: frontLabels } = await axiosReq.get(
          `api/front-labels/?trolley=${id}`
        );
        const { data: backLabels } = await axiosReq.get(
          `api/back-labels/?trolley=${id}`
        );

        const { results: frontLabelData } = frontLabels;
        const { results: backLabelData } = backLabels;

        setTrolley(trolley);
        setLabels({
          front: frontLabelData,
          back: backLabelData,
        });
      } catch (err) {
        console.log(err?.response.data);
      } finally {
        setLoaded(true);
      }
    };

    fetchTrolley();
  }, []);

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/api/trolleys/${id}/`);
      navigate('/');
    } catch (err) {
      console.log(err.response?.status);
    };
  };

  const handleUpdate = () => {
    navigate(`/trolley/${id}/update/`);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col
          xs={12}
          md={{ span: 5 }}
          className={`${styles.Div} d-flex flex-column justify-content-evenly`}
        >
          <Container className="d-flex">
            <h1 className="text-white p-2">Key Info</h1>
            { loaded && <div className="ms-auto">
              <Button 
                variant="success my-3 mx-1"
                onClick={handleUpdate}>
                <FontAwesomeIcon icon={faPencil} />
              </Button>
              <Button 
              variant="danger my-3 mx-1"
              onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>}
          </Container>
          {loaded ? (
            <>
              <p className={styles.Info}>Trolley Number: {trolley.id}</p>
              <p className={styles.Info}>Creator: {creator}</p>
              <p className={styles.Info}>In Use: {in_use ? "Yes" : "No"}</p>
              {notes && <p className={styles.Info}>Notes: {notes}</p>}
              <p className={styles.Info}>
                Totes Count: {totes_count === "Ten Totes" ? "10" : "8"}
              </p>
              <p className={styles.Info}>Created At: {created_at}</p>
              <p className={styles.Info}>Last Updated: {updated_at}</p>
            </>
          ) : (
            <Container className="text-white mt-3 mb-4">
              <Spinner />
            </Container>
          )}
        </Col>
        <Col xs={12} md={{ span: 5, offset: 2 }}>
          <Row
            className={`d-flex justify-content-evenly text-center mb-3 ${
              styles.Div
            } ${isMobile && "mt-4 mb-2"}`}
          >
            <h1 className="text-white p-3">Missing Front Labels</h1>
            {loaded ? (
              <>
                {labels.front.map((label, idx) =>
                  label.checked ? null : (
                    <Col
                      key={idx}
                      className={styles.Info}
                      xs={10}
                      sm={3}
                      lg={5}
                    >
                      {shapeLabels[idx]?.icon}
                    </Col>
                  )
                )}
              </>
            ) : (
              <Container className="text-white mt-3 mb-4">
                <Spinner />
              </Container>
            )}
          </Row>
          <Row
            className={`d-flex justify-content-evenly text-center mt-3 ${
              styles.Div
            } ${isMobile && "mt-4 mb-2"}`}
          >
            <h1 className="text-white p-3">Missing Back Labels</h1>
            {loaded ? (
              <>
                {labels.back.map((label, idx) =>
                  label.checked ? null : (
                    <Col
                      key={idx}
                      className={styles.Info}
                      xs={10}
                      sm={3}
                      lg={5}
                    >
                      {shapeLabels[idx]?.icon}
                    </Col>
                  )
                )}
              </>
            ) : (
              <Container className="text-white mt-3 mb-4">
                <Spinner />
              </Container>
            )}
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title>Delete Trolley</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this trolley?</Modal.Body>
        <Modal.Body><small>You cannot undo this action</small></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TrolleyDetail;
