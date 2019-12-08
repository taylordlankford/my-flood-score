import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UpdateEmailConfirmation = props => {
  const [passwordConfirmation, setPasswordConfirmation ] = useState("");
  const isInvalid = passwordConfirmation === "";

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton style={{ border: "none" }}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ paddingBottom: "40px" }}>
          <h4>Confirm Password to Continue</h4>
        </div>
        <Form>
          <Form.Control
            defaultValue={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            type="password"
            placeholder="password"
          />
          <Form.Text className="text-muted">
            For your security, please enter your MyFloodScore password to
            continue.
          </Form.Text>
        </Form>
      </Modal.Body>
      <div style={{ padding: "10px 10px 40px 10px" }}>
        <Button
          disabled={isInvalid}
          onClick={e => props.updateEmail(e, passwordConfirmation)}
          // onClick={e => props.updateEmail(e, email)}
        >
          Confirm Password
        </Button>{" "}
        <Button variant="secondary" disabled={isInvalid} onClick={props.onHide}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default UpdateEmailConfirmation;
