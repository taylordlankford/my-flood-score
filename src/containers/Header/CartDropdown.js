import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import { removeItem, addQuantity, subtractQuantity } from '../../redux/actions/cartActions'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'
import { FaShoppingCart } from 'react-icons/fa'
import Overlay from  'react-bootstrap/Overlay'
import ButtonToolbar from  'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MdClose } from 'react-icons/md'
import DiscoverImg from '../../assets/images/Discover.svg'

function CartDropdown (props) {
  const {
    items,
    removeItem,
    addQuantity,
    subtractQuantity
  } = props
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = () => {
    // setShow(!show);
    // setTarget(event.target);
  }

  const handleOnMouseEnter = (event) => {
    setShow(!show);
    setTarget(event.target);
  }

  // const handleOnMouseLeave = (event) => {
  //   const show = false;
  //   setShow(show);
  //   setTarget(event.target);
  // }

  const handleOnClickClose = (cartItem) => {
    removeItem(cartItem.id)
  }

  return (
    <ButtonToolbar ref={ref} style={{ display: 'inline' }}>
      <FaShoppingCart
        className="cart-custom-dropdown"
        onMouseEnter={handleOnMouseEnter}
        onClick={handleClick} 
      />

      {
        (window.location.pathname === ROUTES.CART) ?
          <div style={{ display: 'inline' }}></div>
          :
          <Overlay
            show={show}
            target={target}
            placement="bottom-end"
            container={ref.current}
            transition={true}> 

            <Popover className="cart-popover-menu" id="popover-contained">
                <Popover.Content>
                {
                    (items.length > 0) ?
                      items.map((cartItem, index) => {
                        return (
                          <Row key={index}>
                            <Col sm={3}>
                              <img src={cartItem.img ? cartItem.img : DiscoverImg} className="cart-item-img" />
                            </Col>
                            <Col md={7}>
                              <p className="cart-item-title">
                                {cartItem.title}
                              </p>
                            </Col>
                            <Col sm={2}>
                              <MdClose
                                className="cart-item-close-action" 
                                onClick={() => handleOnClickClose(cartItem)} />
                            </Col>
                          </Row>
                        )
                      })
                    :
                    <Row>
                      <p>No Products in the cart.</p>
                    </Row>
                }
                <div style={{ color: '#666666', padding: '14px 0 14px 0', textAlign: 'center' }}>
                  <h5><b>Subtotal: $0.00</b></h5>
                </div>
                <Button className="secondary-btn" style={{ backgroundColor: '#c4c4c4', width: '100%', marginBottom: '5px' }}>View Cart</Button>
                <Button style={{ width: '100%' }}>Checkout</Button>
              </Popover.Content>
            </Popover>
          </Overlay>
      } 
    </ButtonToolbar>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => { dispatch(removeItem(id)) },
    addQuantity: (id) => { dispatch(addQuantity(id)) },
    subtractQuantity: (id) => { dispatch(subtractQuantity(id)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))