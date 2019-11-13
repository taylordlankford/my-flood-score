import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

import { removeItem } from '../../../redux/actions/cartActions'
import { connect } from 'react-redux'

import Popover from 'react-bootstrap/Popover'
import { FaShoppingCart } from 'react-icons/fa'
import Overlay from  'react-bootstrap/Overlay'

import CartDropdownContent from './CartDropdownContent'
import CartCounter from './CartCounter'

function CartDropdown (props) {
  const {
    items,
    removeItem,
  } = props
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleOnClick = () => {
    props.history.push(ROUTES.CART)
  }

  const handleOnMouseEnter = (event) => {
    setShow(!show);
    setTarget(event.target);
  }

  return (
    <div className="cart-link-wrapper"> 
      <span 
        className="cart-custom-dropdown"
        onMouseEnter={handleOnMouseEnter}
        onClick={handleOnClick}>

        <FaShoppingCart className="cart-icon" />
        {
          (items.length > 0) ?
            <CartCounter cartCount={items.length} />
            :
            <span style={{ display: 'none' }}></span>
        }
      </span>
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

            <Popover
              className="cart-popover-menu"
              id="popover-contained">

              <CartDropdownContent
                items={items}
                removeItem={removeItem} />
            </Popover>
          </Overlay>
      } 
    </div>
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