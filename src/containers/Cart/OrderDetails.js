import React from 'react'
import Col from 'react-bootstrap/Col'

const OrderDetails = (props) => {
  return(
    <Col sm={4}>
      <div className="order-details">
        <div className="cartSubTotalAmount">
          <span>Subtotal</span>
          <span className="cart-amount">$ {props.total / 100}</span>
        </div>
        <div className="cartTotalAmount">
          <span>Total</span>
          <span className="cart-amount">$ {props.total / 100}</span>
        </div>
        <br />
        <label
          onClick={props.gotoCheckout}
          htmlFor="submit-form"
          tabIndex="0"
          id="cartPlaceOrderBtn"
          className="place-order-button add-to-cart-button btn btn-primary btn-primary">
          Proceed to checkout
        </label>
      </div>
    </Col>
  )
}

export default OrderDetails