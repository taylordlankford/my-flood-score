import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

const BillingAddressForm = props => {
  return (
    <Col>
      <Row>
        Billing Form
        <div onClick={props.disableBillingForm} className="link">
          Cancel
        </div>
      </Row>
      <Row>
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Street Address 1</Form.Label>
              <Form.Control
                style={{ width: "100%" }}
                type="text"
                placeholder="Street Address 1"
                defaultValue={props.firestoreUser.streetAddress1}
              />
              <Form.Label>Street Address 2</Form.Label>
              <Form.Control
                style={{ width: "100%" }}
                type="text"
                placeholder="Street Address 2"
                defaultValue={props.firestoreUser.streetAddress2}
              />
            </Form.Group>
          </Form>
        </div>
      </Row>
    </Col>
  );
};

export default BillingAddressForm;
