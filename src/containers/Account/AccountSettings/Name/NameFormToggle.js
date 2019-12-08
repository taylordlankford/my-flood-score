import React, { useState } from "react";
import { StyledLink } from "../../StyledComponents";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NameForm from "./NameForm";

const NameFormToggle = props => {
  const [showNameForm, setShowNameForm] = useState(false);

  const toggleNameForm = () => {
    showNameForm === true ? setShowNameForm(false) : setShowNameForm(true);
  };

  const handleNameChange = (
    e,
    firestoreUser,
    firebase,
    firstName,
    lastName
  ) => {
    e.preventDefault();
    const updatedUser = {
      ...firestoreUser,
      firstName,
      lastName
    };

    props.firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);
    setShowNameForm(false);
  };

  return (
    <Card style={{ border: "none" }}>
      {!showNameForm ? (
        <Card.Header
          style={{ padding: "20px 0 20px 0", backgroundColor: "#fff" }}
        >
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Legal Name</b>
              </h5>
              <p>
                {props.firestoreUser.firstName +
                  " " +
                  props.firestoreUser.lastName}
              </p>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleNameForm}>
                {!showNameForm ? "Edit" : "Cancel"}
              </StyledLink>
            </Col>
          </Row>
        </Card.Header>
      ) : (
        <Card.Header
          style={{
            border: "none",
            padding: "20px 0 20px 0",
            backgroundColor: "#fff"
          }}
        >
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Legal Name*</b>
              </h5>
              <p>
                This is the name on your travel document, which could be a
                license or a passport.
              </p>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleNameForm}>
                {!showNameForm ? "Edit" : "Cancel"}
              </StyledLink>
            </Col>
          </Row>
        </Card.Header>
      )}

      {showNameForm ? (
        <Card.Body>
          <NameForm
            firestoreUser={props.firestoreUser}
            firebase={props.firebase}
            handleNameChange={handleNameChange}
          />
        </Card.Body>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default NameFormToggle;
