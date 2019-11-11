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

  return (
    <ButtonToolbar ref={ref} style={{display: 'inline'}}>
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
            transition={true}
          > 
              <Popover className="cart-popover-menu" id="popover-contained">
                <Popover.Content>
                {
                  items.map((cartItem, index) => {
                    return (
                      <li key={index}>
                        {cartItem.title}
                      </li>
                    )
                  })
                }
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

// export default withRouter(Cart)
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))