import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../../routes/constants/routes'
import { connect } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import CartDropdownContent from './CartDropdownContent'
import CartCounter from './CartCounter'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './CartDropdown.css'

const CartDropdown = (props) => {
  const {
    addedItems,
    total
  } = props

  const [
    dropdownVisible,
    setDropdownVisible
  ] = useState(false)

  const cartQuantity = () => {
    let cartCounter = 0
    addedItems.map((item) => {
      cartCounter += item.quantity
    })
    return cartCounter
  }

  return (
    <TransitionGroup
      style={{ display: 'inline' }}
      className="popover-container"
      onMouseLeave={() => setDropdownVisible(false)}>

      <span onMouseEnter={() => setDropdownVisible(true)}>
        <FaShoppingCart
          onClick={() => props.history.push(ROUTES.CART)}
          className="cart-icon" />
        {
          (addedItems.length > 0) ?
            <CartCounter cartCount={cartQuantity()} />
            :
            <span style={{ display: 'none' }}></span>
        }
      </span>
      {/* Don't show cart dropdown menu on /cart */}
      {(window.location.pathname === ROUTES.CART) ?
        <div style={{ display: 'none' }}></div>
        :
        dropdownVisible && (
          <CSSTransition timeout={500} in={dropdownVisible} classNames="cartdropdown-menu">
            <CartDropdownContent
              addedItems={addedItems}
              total={total}
            />
          </CSSTransition>
        )}
    </TransitionGroup>
  )
}

const mapStateToProps = (state) => ({
    addedItems: state.cartReducer.addedItems,
    total: state.cartReducer.total
})

const mapDispatchToProps = (/* dispatch */) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))