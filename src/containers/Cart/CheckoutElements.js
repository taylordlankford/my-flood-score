import React, { useContext } from "react";
import { Elements } from "react-stripe-elements";
import { useSelector } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Order from "./Order";
import InjectedCheckoutForm from "./CheckoutForm";
import "./Cart.css";

import Notification from "../../components/Notifications/Notification";

import { CheckoutContext, CheckoutContextProvider } from "./CheckoutContext"

const CheckoutElements = ({history}) => {
  const cart = useSelector(state => state.cartReducer);

  return (
    <Elements>
      <Container style={{ paddingTop: "64px" }}>
        <Notification />
        <Row>
          <Col>
            {/* <h3 style={{ color: "#0D238E", fontWeight: "bold", margin: "0 0 1.5rem" }} > Billing details </h3> */}
            <InjectedCheckoutForm
              items={cart.addedItems}
              total={cart.total}
              history={history}
            />
          </Col>
          <Col>
            <h3
              style={{
                color: "#0D238E",
                fontWeight: "bold",
                margin: "0 0 1.5rem"
              }}
            >
              Your order
            </h3>
            <Order
              items={cart.addedItems}
              total={cart.total}
              paymentProcessing={cart.paymentProcessing}
            />
          </Col>
        </Row>
      </Container>
    </Elements>
  );
};

export default CheckoutElements;
