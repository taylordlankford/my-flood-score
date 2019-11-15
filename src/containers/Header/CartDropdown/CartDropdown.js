import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../../routes/constants/routes'
import { removeItem } from '../../../redux/actions/cartActions'
import { connect } from 'react-redux'
import Popover from 'react-bootstrap/Popover'
import { FaShoppingCart } from 'react-icons/fa'
import Overlay from  'react-bootstrap/Overlay'
import CartDropdownContent from './CartDropdownContent'
import CartCounter from './CartCounter'

function CartDropdown (props) {
  const {
    addedItems,
    total,
    removeItem
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

  const getCartQuantity = () => {
    let cartCounter = 0
    addedItems.map((item) => {
      cartCounter += item.quantity
    })
    return cartCounter
  }

  return (
    <div className="cart-link-wrapper"> 
      <span 
        className="cart-custom-dropdown"
        onMouseEnter={handleOnMouseEnter}
        onClick={handleOnClick}>

        <FaShoppingCart className="cart-icon" />
        {
          (addedItems.length > 0) ?
            <CartCounter cartCount={getCartQuantity()} />
            :
            <span style={{ display: 'none' }}></span>
        }
      </span>
      {console.log(addedItems.length)}
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
                addedItems={addedItems}
                total={total}
                removeItem={removeItem} />
            </Popover>
          </Overlay>
      } 
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    addedItems: state.addedItems,
    total: state.total
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem: (id) => { dispatch(removeItem(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))