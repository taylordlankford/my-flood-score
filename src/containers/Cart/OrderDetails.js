import React from 'react'
import Col from 'react-bootstrap/Col'

const OrderDetails = (props) => {
  return (
    <Col sm={4}>
      <div className="order-details">
        <div className="cartSubTotalAmount">
          <span>Subtotal</span>
          <span className="cart-amount">${(props.total / 100).toFixed(2)}</span>
        </div>
        <div className="cartTotalAmount">
          <span>Total</span>
          <span className="cart-amount">${(props.total / 100).toFixed(2)}</span>
        </div>
        <br />
        <label
          style={{ padding: "4px 10px" }}
          onClick={props.gotoCheckout}
          htmlFor="submit-form"
          tabIndex="0"
          id="cartPlaceOrderBtn"
          className="place-order-button add-to-cart-button btn btn-primary btn-primary"
        >
          Proceed to checkout
        </label>
      </div>
    </Col>
  );
}

export default OrderDetails