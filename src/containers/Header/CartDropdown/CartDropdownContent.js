import React from 'react'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DiscoverImg from '../../../assets/images/Discover.svg'
import { MdClose } from 'react-icons/md'

export default function CartDropdownContent(props) {
  const handleCloseOnClick = (cartItem) => {
    props.removeItem(cartItem.id)
  }

  return (
    <Popover.Content>
      {
        (props.items.length > 0) ?
          <div>
            {
              props.items.map((cartItem, index) => {
                return (
                  <Row key={index}>
                    <Col sm={3}>
                      <img src={cartItem.img ? cartItem.img : DiscoverImg} className="cart-item-img" />
                    </Col>
                    <Col md={7}>
                      <p className="cart-item-title">{cartItem.title}</p>
                    </Col>
                    <Col sm={2}>
                      <MdClose className="cart-item-close-action" onClick={() => handleCloseOnClick(cartItem)} />
                    </Col>
                  </Row>
                )
              })
            }
            <div>
              <div style={{ color: '#666666', padding: '14px 0 14px 0', textAlign: 'center' }}>
                <h5><b>Subtotal: $0.00</b></h5>
              </div>
              <Button className="secondary-btn" style={{ backgroundColor: '#c4c4c4', width: '100%', marginBottom: '5px' }}>View Cart</Button>
              <Button style={{ width: '100%' }}>Checkout</Button>
            </div>
          </div>
        :
          <Row>
            <Col sm={12}>
              <p style={{ color: '#666666', fontSize: '16px' }}>No Products in the cart.</p>
            </Col>
          </Row>
      }
    </Popover.Content>
  )
}
