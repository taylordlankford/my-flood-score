import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Title, StyledLink } from "../../StyledComponents";

const BillingAddress = props => {
  return (
    <Card style={{ marginBottom: "20px", width: "100%" }}>
      <Card.Body>
        <Col>
          <div style={{ textAlign: "right" }}>
            <StyledLink onClick={props.enableBillingForm}>Edit</StyledLink>
          </div>
          <Row>
            <div style={{ paddingBottom: "10px" }}>
              <span>
                <Title>Billing Address</Title>
              </span>
            </div>
          </Row>
          <Row>
            <div>
              <div>{props.firestoreUser.companyName}</div>
              <div>{props.firestoreUser.streetAddress1}</div>
              <div>{props.firestoreUser.streetAddress2}</div>
              <div>{props.firestoreUser.country}</div>
            </div>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default BillingAddress;
