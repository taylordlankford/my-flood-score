import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useFirestoreUser, useFirebase } from "../../../../hooks";
import * as ROUTES from "../../../../routes/constants/routes";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { Title } from "../../StyledComponents";

const ShippingAddress = props => {
  return (
    <Fragment>
      {props.firestoreUser.shippingAddress1 ||
      props.firestoreUser.shippingAddress2 ? (
        <Card style={{ marginBottom: "20px", width: "100%" }}>
          <Card.Body>
            <Col>
            {/*
              <div style={{ textAlign: "right" }}>
                <Link to={ROUTES.EDIT_SHIPPING_ADDRESS}>Edit</Link>
              </div>
            */}
              <Row>
                <span>
                  <Title>Shipping Address</Title>
                </span>
              </Row>
              <Row></Row>
            </Col>
          </Card.Body>
        </Card>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
};

export default ShippingAddress;
