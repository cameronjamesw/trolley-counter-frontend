import React, { useEffect, useState } from "react";
import { Col, Container, Spinner } from "react-bootstrap";
import styles from "../styles/RecentTrollies.module.css";
import { axiosRes } from "../api/axiosDefaults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";

const RecentTrollies = () => {
  const [trollies, setTrollies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  const isMobile = useMediaQuery({ maxWidth: 767 });

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
    <Col
      xs={{ span: 10, offset: 1 }}
      md={{ span: 5, offset: 0 }}
      className={`my-4 text-white ${styles.Main}`}
    >
      <h1 className="p-2 mb-2">Recent Trollies</h1>
      {loading ? (
        <>
          <Container className="mt-3 mb-4">
            <Spinner />
          </Container>
        </>
      ) : (
        <>
          {isMobile ? (
            <>
              {trollies?.map((trolley, idx) => (
                <p className={styles.Trolley} key={idx}>
                  <FontAwesomeIcon
                    className={styles.Icon}
                    icon={faCartShopping}
                  />{" "}
                  {trolley.id} | {trolley.created_at} | {trolley.totes_count}
                </p>
              ))}
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
        </>
      )}
    </Col>
  );
};

export default RecentTrollies;
