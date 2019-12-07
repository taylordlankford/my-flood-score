import React, { useState, Fragment } from "react";
import * as ROUTES from "../../../routes/constants/routes";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import { Link } from "react-router-dom";

import { Title, StyledLink } from "../StyledComponents";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditAccount = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;
  const [toggleEditAccountForm, setToggleEditAccountForm] = useState(false);

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div style={{ textAlign: "right" }}>
            <Link to={ROUTES.EDIT_ACCOUNT_SETTINGS}>
              <StyledLink>Edit</StyledLink>
            </Link>
          </div>
          <Row>
            <Title>Account Settings</Title>
          </Row>
          <br />
          <Row>
            <Col sm={3} style={{ textAlign: "right" }}>
              <div>
                <b>Name:</b>
              </div>
              <div>
                <b>Company:</b>
              </div>
              <div>
                <b>Email:</b>
              </div>
            </Col>
            <Col sm={9}>
              <div>
                {firestoreUser.firstName + " " + firestoreUser.lastName}
              </div>
              <div>
                {firestoreUser.companyName === ""
                  ? "---"
                  : firestoreUser.companyName}
              </div>
              <div>{firestoreUser.email}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditAccount;
