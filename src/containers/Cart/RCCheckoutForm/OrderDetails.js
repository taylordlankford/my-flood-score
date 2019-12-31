import React from "react";

import { TransitionBtn } from "../../../StyledComponents/StyledComponents";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
// import Button from "react-bootstrap/Button";

const OrderDetails = ({ cart, placeOrder, isInvalid, processing }) => {
  const renderItem = item => {
    return (
      <p className="cart-item">
        {item.title}{" "}
        <span style={{ fontWeight: "700" }}>× {item.quantity}</span>{" "}
        <span className="cart-amount">
          ${((item.price * item.quantity) / 100).toFixed(2)}
        </span>
      </p>
    );
  };

  return (
    <Col sm={6}>
      <div className="order-details">
        {cart.addedItems.map(item => renderItem(item))}
        <p className="cart-Subtotal">
          Subtotal{" "}
          <span className="cart-amount">${(cart.total / 100).toFixed(2)}</span>
        </p>
        <p className="cart-total">
          Total{" "}
          <span className="cart-amount">${(cart.total / 100).toFixed(2)}</span>
        </p>
        {(cart.paymentProcessing || processing == true) ? (
          <TransitionBtn
            variant="primary"
            type="submit"
            className="place-order-button"
            style={{ paddingLeft: "15px" }}
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span style={{ marginLeft: "10px" }}>Processing...</span>
          </TransitionBtn>
        ) : (
          <TransitionBtn
            disabled={isInvalid}
            onClick={e => placeOrder(e)}
            htmlFor="submit-form"
            tabIndex="0"
            className="place-order-button add-to-cart-button btn btn-primary"
          >
            PLACE ORDER
          </TransitionBtn>
        )}
      </div>
    </Col>
  );
};

export default OrderDetails;
