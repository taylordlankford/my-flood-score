import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../routes/constants/routes";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Title, StyledLink } from "../StyledComponents";

const EditAccountForm = props => {
  const [companyName, setCompanyName] = useState(props.firestoreUser.companyName);
  const [email, setEmail] = useState(props.firestoreUser.email);
  const [firstName, setFirstName] = useState(props.firestoreUser.firstName);
  const [lastName, setLastName] = useState(props.firestoreUser.lastName);

  return (
    <>
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
        {/*
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
          <Form.Label>Email Address*</Form.Label>
          <Form.Control
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>
        */}
        {/*
        <Form.Group>
          <Form.Label>Password*</Form.Label>
          <Form.Control
            onChange={e => setPassword(e.target.value)}
            defaultValue={email}
            name="passowrd"
            type="password"
            placeholder="Enter Password"
          />
        </Form.Group> */}
        <br />
        <span>
          <Button
            onClick={e =>
              props.handleOnClick(e, firstName, lastName, companyName, email)
            }
          >
            Save
          </Button>
        </span>
        <Link to={ROUTES.ACCOUNT_SETTINGS}>
          <StyledLink> Cancel</StyledLink>
        </Link>
      </Form>
    </>
  );
};


export default EditAccountForm;