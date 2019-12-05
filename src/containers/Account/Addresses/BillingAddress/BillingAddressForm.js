import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { StyledLink } from "../../StyledComponents";

const BillingAddressForm = props => {
  const [country] = useState(props.firestoreUser.country);
  const [streetAddress1, setStreetAddress1] = useState(
    props.firestoreUser.streetAddress1
  );
  const [streetAddress2, setStreetAddress2] = useState(
    props.firestoreUser.streetAddress2
  );

  return (
    <Col>
      <Form>
        <Form.Group>
          <Form.Label>Country*</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Country"
            defaultValue={country}
          />
          <br />
          <Form.Label>Street Address*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Street Address 1"
            defaultValue={streetAddress1}
            onChange={e => setStreetAddress1(e.target.value)}
          />
          <br />
          <Form.Control
            type="text"
            placeholder="Apartment, suite, unit etc. (optional)"
            defaultValue={streetAddress2}
            onChange={e => setStreetAddress2(e.target.value)}
          />
          <br />
          <span>
            <Button
              onClick={e =>
                props.handleUpdateUser(e, streetAddress1, streetAddress2)
              }
            >
              Save
            </Button>
          </span>
          <StyledLink
            style={{ marginLeft: "10px" }}
            onClick={props.disableBillingForm}
          >
            Cancel
          </StyledLink>
        </Form.Group>
      </Form>
    </Col>
  );
};

export default BillingAddressForm;
