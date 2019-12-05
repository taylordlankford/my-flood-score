import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdClose } from 'react-icons/md'
import { IoIosClose } from 'react-icons/io'

const CartDropdownItem = (props) => {
  return (
    <Row style={{ paddingBottom: '14px' }}>
      <Col md={3}>
        <img
          alt={props.cartItem.name}
          src={props.cartItem.img ? props.cartItem.img : props.discoverImg}
          className="cart-item-img" />
      </Col>
      <Col
        md={7}
        className="cart-item-title"
        onClick={() => props.handleOnClickTitle(props.cartItem.title)}
      >
        {props.cartItem.title}
        <div style={{ padding: '4px 0 4px 0', lineHeight: '1.4rem', fontWeight: '500', color: '#666666' }}>
          {props.cartItem.quantity}
          <IoIosClose />
          ${(props.cartItem.price / 100).toFixed(2)}
        </div>
      </Col>
      <Col md={2}>
        <MdClose
          className="cart-item-close-action"
          onClick={() => props.removeItem(props.cartItem.id)}
        />
      </Col>
    </Row>
  )
}

export default CartDropdownItem