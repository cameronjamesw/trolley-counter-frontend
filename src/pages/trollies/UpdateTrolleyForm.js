import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { Alert, Button, Container, Form } from "react-bootstrap";
import styles from "../../styles/AddTrolleyForm.module.css";
import AddLabelsForm from "./AddLabelsForm";
import { useTrolleyForm } from "../../contexts/TrolleyFormContext";
import { handleLocalStorage } from "../../utils/utils";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTrolleyForm = () => {
  // Gets the current user
  const currentUser = useCurrentUser();
  const [errors, setErrors] = useState({});
  const [count, setCount] = useState();

  // Destructure variablrs from useTrolleyForm Context
  const {
    formData,
    updateField,
    toggleInUse,
    updateToteCount,
    setShow,
    saveClicked,
    updateSaveClicked,
  } = useTrolleyForm();

  // Destructure variables from formData and saveClicked
  const { totes_count, in_use, notes, front_labels, back_labels } = formData;
  const { front, back } = saveClicked;

  if (currentUser === undefined) {
    return null; // or loading spinner
  }

  // Redirects user if unauthenticated
  useRedirect(!currentUser ? "loggedIn" : "loggedOut");

  const { id } = useParams();

  // Navigates user to relevent page
  const navigate = useNavigate();

  // This useEffect fetches the most recent trolley count
  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: count } = await axiosReq.get('/api/trolleys/');
        setCount(count.results[0].id);

        const { data: trolley } = await axiosRes.get(`/api/trolleys/${id}/`);
        console.log(trolley.results);
      } catch (err) {
        console.log(err.response?.data)
      }
    };
    handleMount();
  }, []);

  // Cleans up and resets states on unmount
  useEffect(() => {
    return () => {
      updateSaveClicked({ front: false, back: false });
      handleLocalStorage([], null, null, null, true);
      setShow(false);
    };
  }, []);

  // Handles the totes_count change, passes to TrolleyFormContext
  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    updateToteCount(value);
  };

  // Handles the in_use change, passes to TrolleyFormContext
  const handleSwitchChange = (event) => {
    toggleInUse(event.target.checked);
  };

  // Handles the notes change, passes to TrolleyFormContext
  const handleChange = (event) => {
    updateField(event.target.name, event.target.value);
  };

  // Handles the submission of the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Shows the setSave alert if front or back are false
    if (!front || !back) {
      setShow(true);
    } else {
      // Resets labels local storage on submission
      handleLocalStorage([], null, null, true, null);

      // Sets the payload for post request
      const payload = {
        totes_count,
        in_use,
        notes,
        front_labels,
        back_labels,
      };

      try {
        // Posts header and payload to endpoint within package
        const { data } = await axiosReq.post("/api/trolleys/", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        navigate(`/trolley/${count + 1}/`);
      } catch (err) {
        if (err.response) {
          // Server responded with a status code like 400, 401, etc.
          setErrors(err.response.data);
        } else {
          // Network or other error
          setErrors({
            non_field_errors: ["Something went wrong. Please try again."],
          });
        };
      };
    };
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Container className={styles.AddTrolleyForm}>
          <h1 className="text-white my-4">Add Trolley</h1>

          {Array.isArray(errors?.non_field_errors) &&
            errors.non_field_errors.map((msg, idx) => (
              <Alert key={idx} variant="danger">
                {msg}
              </Alert>
            ))}

          <Container className="row">
            <p className="fst-italic text-body-secondary text-left text-start">
              Please specify the amount of totes this trolley has, and check if
              the trolley is in use.
            </p>
            <Form.Group className="col-9" controlId="tote-count">
              <Form.Label className="d-none">Tote Count</Form.Label>
              <Form.Select
                name="totes_count"
                value={totes_count}
                onChange={handleSelectChange}
              >
                <option value="">-- Select Count --</option>
                <option value="1">8 Totes</option>
                <option value="2">10 Totes</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="col align-self-center" controlId="in-use">
              <Form.Label className="d-none">In Use?</Form.Label>
              <Form.Check
                type="switch"
                id="custom-switch"
                checked={in_use}
                onChange={handleSwitchChange}
              />
            </Form.Group>
            {Array.isArray(errors?.totes_count) &&
              errors.totes_count.map((msg, idx) => (
                <Alert className="mt-3" variant="warning" key={idx}>
                  {msg}
                </Alert>
              ))}
          </Container>

          <Container className="row">
            <Form.Group className="mt-4 col" controlId="notes">
              <p className="fst-italic text-body-secondary text-left text-start">
                Add any notes to this trolley. For example, "the left break is
                faulty"
              </p>
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter any notes here..."
                name="notes"
                value={notes}
                onChange={handleChange}
              />
            </Form.Group>
            {Array.isArray(errors?.notes) &&
              errors.notes.map((msg, idx) => (
                <Alert key={idx} variant="danger">
                  {msg}
                </Alert>
              ))}
          </Container>
        </Container>

        <AddLabelsForm totes_count={totes_count} />

        <Container className={`${styles.AddTrolleyForm} mb-4`}>
          <Button variant="success" type="submit">
            Create Trolley
          </Button>
        </Container>
      </Form>
    </div>
  );
};

export default UpdateTrolleyForm
