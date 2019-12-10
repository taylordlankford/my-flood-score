import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { PrimaryBtn } from "../../../../StyledComponents/StyledComponents";

const NameForm = props => {
  const [firstName, setFirstName] = useState(props.firestoreUser.firstName);
  const [lastName, setLastName] = useState(props.firestoreUser.lastName);

  const isInvalid =
    firstName === "" ||
    lastName === "" ||
    (firstName === props.firestoreUser.firstName && 
      lastName === props.firestoreUser.lastName);

  return (
    <div style={{ paddingBottom: "40px", borderBottom: "1px solid #eee" }}>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                defaultValue={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                name="first name"
                placeholder="Enter First Name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                defaultValue={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={2} style={{ textAlign: "left" }}>
            <PrimaryBtn
              disabled={isInvalid}
              onClick={e =>
                props.handleNameChange(
                  e,
                  props.firestoreUser,
                  props.firebase,
                  firstName,
                  lastName
                )
              }
            >
              Save
            </PrimaryBtn>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
};

export default NameForm;
