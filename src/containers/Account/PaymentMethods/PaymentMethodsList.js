import React from "react";
import {
  Container,
  DangerTransitionBtn
} from "../../../StyledComponents/StyledComponents";
import { MdClose } from "react-icons/md";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PaymentMethodsList = props => {
  return (
    <>
      {props.paymentMethods.map((paymentMethod, idx) => (
        <Container
          key={idx}
          borderBottom="1px solid #eee"
          padding="20px 0 20px 0"
        >
          <Row md={12}>
            <Col md={10} style={{ textAlign: "left" }}>
              <b>{paymentMethod.card.brand}</b> {paymentMethod.card.last4}
              <p>
                <b>Exp:</b> {paymentMethod.card.exp_month} /{" "}
                {paymentMethod.card.exp_year}
              </p>
            </Col>
            <Col md={2} style={{ textAlign: "right" }}>
              <DangerTransitionBtn onClick={e => props.removePaymentMethod(e)}>
                Remove
              </DangerTransitionBtn>
            </Col>
          </Row>
        </Container>
      ))}
    </>
  );
};

export default PaymentMethodsList;
