import React, { useState } from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { Title, StyledLink } from "../StyledComponents";

const EditAccountForm = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState(props.firestoreUser.phone);
  // const [password, setPassword] = useState(props.firestoreUser.password);

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleOnClick = (e, firstName, lastName, companyName, email) => {
    e.preventDefault();
    console.log(props.history);

    const updatedUser = {
      ...firestoreUser,
      firstName,
      lastName,
      companyName,
      email
    };

    firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);
  };

  return (
    <div>
      {console.log(firestoreUser)}

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
                defaultValue={firestoreUser.firstName}
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
                defaultValue={firestoreUser.lastName}
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
            defaultValue={firestoreUser.companyName}
            name="companyName"
            type="text"
            placeholder="Enter Company Name"
          />
        </Form.Group>

        {/*
        <Form.Group>
          <Form.Label>Phone*</Form.Label>
          <Form.Control
            onChange={e => setPhone(e.target.value)}
            defaultValue={phone}
            name="phone"
            type="tel"
            placeholder="Enter Phone Number"
          />
        </Form.Group>*/}

        <Form.Group>
          <Form.Label>Email Address*</Form.Label>
          <Form.Control
            onChange={e => setEmail(e.target.value)}
            defaultValue={firestoreUser.email}
            type="email"
            name="email"
            placeholder="Enter email"
          />
        </Form.Group>

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
              handleOnClick(e, firstName, lastName, companyName, email)
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
