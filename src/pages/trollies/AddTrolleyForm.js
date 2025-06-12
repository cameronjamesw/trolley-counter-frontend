import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../styles/AddTrolleyForm.module.css"
import AddLabelsForm from "./AddLabelsForm";
import { useTrolleyForm } from "../../contexts/TrolleyFormContext";

const AddTrolleyForm = () => {
  const currentUser = useCurrentUser();

  const {
    formData: { totes_count, in_use, notes },
    updateField,
    toggleInUse,
    updateToteCount,
  } = useTrolleyForm();

  if (currentUser === undefined) {
    return null; // or loading spinner
  }

  useRedirect(!currentUser ? "loggedIn" : "loggedOut");

  const handleSelectChange = (event) => {
    const value = parseInt(event.target.value, 10);
    updateToteCount(value);
  };

  const handleSwitchChange = (event) => {
    toggleInUse(event.target.checked);
  };

  const handleChange = (event) => {
    updateField(event.target.name, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);
  };

  return (
    <div>
    <Form onSubmit={handleSubmit} className={styles.AddTrolleyForm}>
      <h1 className="text-white my-4">Add Trolley</h1>
      <Container className="row">
        <p className="fst-italic text-body-secondary text-left text-start">
          Please specify the amount of totes this trolley has, and check if the
          trolley is in use.
        </p>
        <Form.Group className="col-10" controlId="tote-count">
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
      </Container>

<Container className="row">
      <Form.Group className="mt-4 col" controlId="notes">
        <p className="fst-italic text-body-secondary text-left text-start">
          Add any notes to this trolley.
          For example, "the left break is faulty"
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
      </Container>

      <Button variant="success" className="mt-4" type="submit">
        Submit
      </Button>
    </Form>

    <AddLabelsForm totes_count={totes_count} />
    </div>
  );
};

export default AddTrolleyForm;
