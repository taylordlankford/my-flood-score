import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

import { removeItem } from '../../../redux/actions/cartActions'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import { FaShoppingCart } from 'react-icons/fa'
import Overlay from  'react-bootstrap/Overlay'
import ButtonToolbar from  'react-bootstrap/ButtonToolbar'
import CartDropdownContent from './CartDropdownContent'

function CartDropdown (props) {
  const {
    items,
    removeItem,
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
              <CartDropdownContent
                items={items}
                removeItem={removeItem} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))