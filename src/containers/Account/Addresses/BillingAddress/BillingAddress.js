import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const BillingAddress = props => {
  return (
    <Col>
      <Row>
        {console.log(props.firestoreUser)}
        <span>
          <h3 className="title">Billing Address</h3>
        </span>
        <span style={{ paddingLeft: "20px" }}>
          <div onClick={props.enableBillingForm} className="link">
            Edit
          </div>
        </span>
        <div>
          <div>{props.firestoreUser.companyName}</div>
          <div>{props.firestoreUser.streetAddress1}</div>
          <div>{props.firestoreUser.streetAddress2}</div>
          <div>{props.firestoreUser.country}</div>
        </div>
      </Row>
    </Col>
  );
};

export default BillingAddress;
