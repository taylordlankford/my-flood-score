import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <Row>
        Billing Form
        <div onClick={props.disableBillingForm} className="link">
          Cancel
        </div>
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Label>Country*</Form.Label>
            <Form.Control
              disabled
              type="text"
              placeholder="Country"
              defaultValue={country}
            />
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
            <Button>Save</Button>
          </Form.Group>
        </Form>
      </Row>
    </Col>
  );
};

export default BillingAddressForm;
