import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

const OrderDetails = ({ cart, placeOrder, isInvalid }) => {
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
        {cart.paymentProcessing ? (
          <Button
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
          </Button>
        ) : (
          <Button
            disabled={isInvalid}
            onClick={e => placeOrder(e)}
            htmlFor="submit-form"
            tabIndex="0"
            className="place-order-button add-to-cart-button btn btn-primary"
          >
            PLACE ORDER
          </Button>
        )}
      </div>
    </Col>
  );
};

export default OrderDetails;
