import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { PrimaryBtn, SecondaryBtn } from "../../../../StyledComponents/StyledComponents";

const UpdateEmailConfirmation = props => {
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
        <div style={{ color: "#666666", paddingBottom: "40px" }}>
          <h4>Confirm Password to Continue</h4>
        </div>
        <Form onSubmit={e => e.preventDefault()}>
          <Form.Text>{props.error && <p>{props.error.message}</p>}</Form.Text>
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
        <PrimaryBtn
          disabled={isInvalid}
          onClick={e => props.updateEmail(e, passwordConfirmation)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          Confirm Password
        </PrimaryBtn>
        <SecondaryBtn
          style={{ width: "100%" }}
          variant="secondary"
          onClick={props.onHide}
        >
          Close
        </SecondaryBtn>
      </div>
    </Modal>
  );
};

export default UpdateEmailConfirmation;
