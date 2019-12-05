import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditAccountForm = props => {
  const [companyName, setCompanyName] = useState(
    props.firestoreUser.companyName
  );
  const [phone, setPhone] = useState(props.firestoreUser.phone);
  const [email, setEmail] = useState(props.firestoreUser.email);
  const [firstName, setFirstName] = useState(props.firestoreUser.firstName);
  const [lastName, setLastName] = useState(props.firestoreUser.lastName);

  return (
    <div>
      {console.log(props.firestoreUser)}

      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                defaultValue={firstName}
                type="text"
                name="firstName"
                placeholder="Enter First Name"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Label>Last Name*</Form.Label>
              <Form.Control
                defaultValue={lastName}
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>Company Name (Optional)</Form.Label>
          <Form.Control
            defaultValue={companyName}
            name="companyName"
            type="text"
            placeholder="Enter Company Name"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone*</Form.Label>
          <Form.Control
            defaultValue={phone}
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address*</Form.Label>
          <Form.Control
            defaultValue={email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <br />
        <span>
          <Button>Save</Button>
        </span>
      </Form>
    </div>
  );
};

export default EditAccountForm;
