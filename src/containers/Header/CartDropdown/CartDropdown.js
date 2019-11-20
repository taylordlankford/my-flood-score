import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../../routes/constants/routes'
import { removeItem } from '../../../redux/actions/cartActions'
import { connect } from 'react-redux'
import { FaShoppingCart } from 'react-icons/fa'
import CartDropdownContent from './CartDropdownContent'
import CartCounter from './CartCounter'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function CartDropdown(props) {
  const {
    addedItems,
    total,
    removeItem 
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
          (props.addedItems.length > 0) ?
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
          <CSSTransition in={dropdownVisible} classNames="cartdropdown-menu">
            <CartDropdownContent
              addedItems={addedItems}
              total={total}
              removeItem={removeItem} />
          </CSSTransition>
        )}
    </TransitionGroup>
  )
}

const mapStateToProps = (state) => ({
    addedItems: state.addedItems,
    total: state.total
})


const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => { dispatch(removeItem(id)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdown))