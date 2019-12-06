import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../routes/constants/routes";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Title, StyledLink } from "../../StyledComponents";

const BillingAddress = props => {
  return (
    <Card style={{ marginBottom: "20px", width: "100%" }}>
      <Card.Body>
        <Col>
        {/*
          <div style={{ textAlign: "right" }}>
            <Link to={ROUTES.EDIT_BILLING_ADDRESS}>Edit</Link>
          </div>
        */}
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
