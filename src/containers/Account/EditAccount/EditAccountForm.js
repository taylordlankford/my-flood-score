import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Title, StyledLink } from "../StyledComponents";

const EditAccountForm = props => {
  const [firstName, setFirstName] = useState(props.firestoreUser.firstName);
  const [lastName, setLastName] = useState(props.firestoreUser.lastName);
  const [companyName, setCompanyName] = useState(props.firestoreUser.companyName);
  const [phone, setPhone] = useState(props.firestoreUser.phone);
  const [email, setEmail] = useState(props.firestoreUser.email);
  const [password, setPassword] = useState(props.firestoreUser.password);

  return (
    <div>
      {console.log(props.firestoreUser)}

      <Form>
        <Row>
          <Title>Edit Account Settings</Title>
        </Row>
        <br />
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name*</Form.Label>
              <Form.Control
                onChange={e => setFirstName(e.target.value)}
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
                onChange={e => setLastName(e.target.value)}
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
            onChange={e => setCompanyName(e.target.value)}
            defaultValue={companyName}
            name="companyName"
            type="text"
            placeholder="Enter Company Name"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone*</Form.Label>
          <Form.Control
            onChange={e => setPhone(e.target.value)}
            defaultValue={phone}
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email Address*</Form.Label>
          <Form.Control
            onChange={e => setEmail(e.target.value)}
            defaultValue={email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password*</Form.Label>
          <Form.Control
            onChange={e => setPassword(e.target.value)}
            defaultValue={email}
            name="passowrd"
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group>

        <br />
        <span>
          <Button
            onClick={e =>
              props.handleOnClick(
                e,
                firstName,
                lastName,
                companyName,
                phone,
                email,
                password
              )
            }
          >
            Save
          </Button>
        </span>
        <StyledLink style={{ marginLeft: "10px" }} onClick={props.disableForm}>
          Cancel
        </StyledLink>
      </Form>
    </div>
  );
};

export default EditAccountForm;
