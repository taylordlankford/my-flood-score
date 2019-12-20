import React from "react";
import { Elements } from "react-stripe-elements";
import Container from "react-bootstrap/Container";
import "./Cart.css";
import Notification from "../../components/Notifications/Notification";
import { CheckoutContextProvider } from "./CheckoutContext"
import CheckoutGateway from "./CheckoutGateway"
// const CheckoutPage = ({ history }) => {
// const cart = useSelector(state => state.cartReducer);

const CheckoutPage = ({ history }) => {
  return (
    <CheckoutContextProvider>
      <Elements>
        <Container style={{ paddingTop: "64px" }}>
          <Notification />
          <CheckoutGateway history={history} />
        </Container>
      </Elements>
    </CheckoutContextProvider>
  );
};

export default CheckoutPage;
