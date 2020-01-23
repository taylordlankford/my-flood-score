import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button'

const Order = ({ paymentProcessing, items, total }) => {
  return (
    <div className="order-details">
      {items.map((item) => renderItem(item))}
      <p className="cart-Subtotal">Subtotal <span className="cart-amount">${(total / 100).toFixed(2)}</span></p>
      <p className="cart-total">Total <span className="cart-amount">${(total / 100).toFixed(2)}</span></p>
      {paymentProcessing
        ? (
          <Button variant="primary" type="submit" className="place-order-button" style={{ paddingLeft: '15px' }}>
            <span className="spinner-grow spinner-grow-sm" style={{ marginRight: '15px' }} role="status" aria-hidden="true"></span>
            Processing...
          </Button>
        )
        : (
          <label htmlFor="submit-form" tabIndex="0" className="place-order-button add-to-cart-button btn btn-primary">
            PLACE ORDER
          </label>
        )
      }
    </div>
  )
}

const renderItem = (item) => {
return <p className="cart-item">{item.title} 	<span style={{ fontWeight: '700' }}>× {item.quantity}</span> <span className="cart-amount">${(item.price * item.quantity / 100).toFixed(2)}</span></p>
}

export default Order
