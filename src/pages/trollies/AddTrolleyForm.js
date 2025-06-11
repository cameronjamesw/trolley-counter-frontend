import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { Button, Container, Form } from "react-bootstrap";

const AddTrolleyForm = () => {
  const currentUser = useCurrentUser();

  const [formData, setFormData] = useState({
    totes_count: 1,
    in_use: 0,
    notes: "",
  });

  const {totes_count, in_use, notes} = formData

  if (currentUser === undefined) {
    return null; // or loading spinner
  }

  useRedirect(!currentUser ? "loggedIn" : "loggedOut");

const handleSelectChange = (event) => {
  const value = parseInt(event.target.value, 10); // since you're working with numbers
  setFormData(prev => ({
    ...prev,
    totes_count: value,
  }));
};

const handleSwitchChange = (event) => {
  const checked = event.target.checked;
  setFormData(prev => ({
    ...prev,
    in_use: checked ? 1 : 0,
  }));
  console.log('Switch is now:', checked);
};

const handleChange = (event) => {
  setFormData(prev => ({
    ...prev,
    [event.target.name]: event.target.value
  }));
};

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(formData);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white my-4">Add Trolley</h1>

      <Container className="row">
        <Form.Group className="mt-4 col-10" controlId="tote-count">
          <Form.Label className="d-none">Tote Count</Form.Label>
          <Form.Select name="totes_count" value={totes_count} onChange={handleSelectChange}>
            <option value="">-- Select Count --</option>
            <option value="1">
              8 Totes
            </option>
            <option value="2">
              10 Totes
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-4 col-2 align-self-center" controlId="in-use">
          <Form.Label className="d-none">In Use?</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={in_use}
            onChange={handleSwitchChange}
          />
        </Form.Group>
      </Container>

      <Form.Group className="mt-4" controlId="notes">
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

      <Button variant="success" className="mt-4" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTrolleyForm;
