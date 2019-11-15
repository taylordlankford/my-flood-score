import React from 'react'
import { withRouter } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DiscoverImg from '../../../assets/images/Discover.svg'
import { MdClose } from 'react-icons/md'
import { IoIosClose } from 'react-icons/io'
import { convertToProductPathName } from '../../../routes/helpers/RouteHelper'

function CartDropdownContent(props) {
  const handleCloseOnClick = (cartItem) => {
    props.removeItem(cartItem.id)
  }

  const handleOnClickTitle = (cartItemTitle) => {
    const productPathName = convertToProductPathName(cartItemTitle)
    props.history.push(`/product/${productPathName}`)
  }

  return (
    <Popover.Content>
      {
        (props.addedItems.length > 0) ?
          <div>
            {
              props.addedItems.map((cartItem, index) => {
                return (
                  <Row key={index}>
                    <Col sm={3}>
                      <img src={cartItem.img ? cartItem.img : DiscoverImg} className="cart-item-img" />
                    </Col>
                      <Col md={7}>
                      <p className="cart-item-title" onClick={() => handleOnClickTitle(cartItem.title)}>
                        <span>{cartItem.title}</span>
                        <div style={{ padding: '4px 0 4px 0', lineHeight: '1.4rem', fontWeight: '500', color: '#666666' }}>
                          <span>{cartItem.quantity}</span>
                          <IoIosClose />
                          <span>${(cartItem.price / 100).toFixed(2)}</span>
                        </div>
                      </p>
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
                <h5><b>Subtotal: ${props.total / 100}</b></h5>
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

export default withRouter(CartDropdownContent)