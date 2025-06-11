import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { Button, Container, Form } from "react-bootstrap";

const AddTrolleyForm = () => {
  const currentUser = useCurrentUser();

  const [selectedValue, setSelectedValue] = useState({});
  const [isEnabled, setIsEnabled] = useState(false); // boolean state

  if (currentUser === undefined) {
    return null; // or loading spinner
  }

  useRedirect(!currentUser ? "loggedIn" : "loggedOut");

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value); // update state
  };

  const handleSwitchChange = (event) => {
    const checked = event.target.checked;
    setIsEnabled(checked); // update the state
    console.log('Switch is now:', checked);
  };

  return (
    <Form onSubmit={() => {}}>
      <h1 className="text-white my-4">Add Trolley</h1>

      <Container className="row">
        <Form.Group className="mt-4 col-10" controlId="tote-count">
          <Form.Label className="d-none">Tote Count</Form.Label>
          <Form.Select value={selectedValue} onChange={handleSelectChange}>
            <option value="">-- Select Count --</option>
            <option value="1" name="8-totes">
              8 Totes
            </option>
            <option value="2" name="10-totes">
              10 Totes
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mt-4 col-2 align-self-center" controlId="in-use">
          <Form.Label className="d-none">In Use?</Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            checked={isEnabled}
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
          value={() => {}}
        />
      </Form.Group>

      <Button variant="success" className="mt-4" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AddTrolleyForm;
