import React, { useState } from "react";
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

  const isInvalid = streetAddress1 === "";

  return (
    <div style={{ paddingBottom: "40px", borderBottom: "1px solid #eee" }}>
      <Form>
        <Form.Group>
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
          <Form.Label>Country*</Form.Label>
          <Form.Control
            disabled
            type="text"
            placeholder="Country"
            defaultValue={country}
          />
          <br />
          <span>
            <Button
              disabled={isInvalid}
              onClick={e =>
                props.updateBillingAddress(e, streetAddress1, streetAddress2)
              }
            >
              Save
            </Button>
          </span>
        </Form.Group>
      </Form>
    </div>
  );
};

export default BillingAddressForm;
