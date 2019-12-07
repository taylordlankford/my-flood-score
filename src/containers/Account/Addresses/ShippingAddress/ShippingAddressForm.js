import React, { useState } from "react";
import { useFirestoreUser, useFirebase } from "../../../../hooks";
import * as ROUTES from "../../../../routes/constants/routes";
import { Link } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { StyledLink } from "../../StyledComponents";

const ShippingAddressForm = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  const [country] = useState("");
  const [streetAddress1, setStreetAddress1] = useState("");
  const [streetAddress2, setStreetAddress2] = useState("");

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleUpdateUser = (e, streetAddress1, streetAddress2) => {
    const updatedFirestoreUser = {
      ...firestoreUser,
      streetAddress1,
      streetAddress2
    };
    // firebase.db.collection("users").doc(firestoreUser.uid).set(updatedFirestoreUser)
    firebase.doFirestoreSet("users", firestoreUser.uid, updatedFirestoreUser);
    props.history.push(ROUTES.ACCOUNT_ADDRESSES);
  };

  return (
    <Col>
      <Form>
        <Form.Group>
          <Form.Label>Country*</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Country"
            defaultValue={firestoreUser.country}
          />
          <br />
          <Form.Label>Street Address*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street Address 1"
            defaultValue={firestoreUser.streetAddress1}
            onChange={e => setStreetAddress1(e.target.value)}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Apartment, suite, unit etc. (optional)"
            defaultValue={firestoreUser.streetAddress2}
            onChange={e => setStreetAddress2(e.target.value)}
          />
          <br />
          <span>
            <Button
              onClick={e => handleUpdateUser(e, streetAddress1, streetAddress2)}
            >
              Save
            </Button>
          </span>
          <Link to={ROUTES.ACCOUNT_ADDRESSES} style={{ marginLeft: "10px" }}>
            <StyledLink>Cancel</StyledLink>
          </Link>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default ShippingAddressForm;
