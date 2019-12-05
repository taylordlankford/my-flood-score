import React from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Title, StyledLink } from "../../StyledComponents";

const ShippingAddress = props => {
  return (
    <Card style={{ marginBottom: "20px", width: "100%" }}>
      <Card.Body>
        <Col>
          <div style={{ textAlign: "right" }}>
            <span style={{ paddingLeft: "20px" }}>
              {/* Currently displays billing address form. Not sure what the property name for shipping address is yet. */}
              <StyledLink onClick={props.enableShippingForm}>Edit</StyledLink>
            </span>
          </div>
          <Row>
            <span>
              <Title>Shipping Address</Title>
            </span>
          </Row>
          <Row></Row>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default ShippingAddress;
