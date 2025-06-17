import React, { useEffect, useState } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import styles from "../styles/RecentTrollies.module.css";
import { axiosReq, axiosRes } from "../api/axiosDefaults";

const RecentTrollies = () => {
  const [trollies, setTrollies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTrollies = async () => {
      try {
        const { data } = await axiosRes.get("/api/trolleys/");
        const { results } = data;
        setTrollies(results);
      } catch (err) {
        setErrors(err?.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchTrollies();
  }, []);

  return (
    <Col xs={10} md={5} className={`my-4 text-white ${styles.Main}`}>
      <h1 className="p-2 mb-2">Recent Trollies</h1>
      {loading ? (
        <>
        <Container className="mt-3 mb-4">
          <Spinner/>
          </Container>
        </>
      ) : (
        <>
          {trollies?.map((trolley, idx) => (
            <p className={styles.Trolley} key={idx}>
              Trolley: {trolley.id} | Created at: {trolley.created_at} |{" "}
              {trolley.totes_count}
            </p>
          ))}
        </>
      )}
    </Col>
  );
};

export default RecentTrollies;
