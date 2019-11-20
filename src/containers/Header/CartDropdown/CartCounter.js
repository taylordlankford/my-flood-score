import React from 'react'

export default function CartCounter(props) {
  return (
    <span className="cart-counter">
      {props.cartCount}
    </span>
  )
}