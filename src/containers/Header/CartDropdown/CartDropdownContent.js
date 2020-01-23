import React from 'react'
import * as ROUTES from '../../../routes/constants/routes'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { PrimaryBtn, SecondaryBtn } from "../../../StyledComponents/StyledComponents";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DiscoverImg from '../../../assets/images/Discover.svg'
import { convertToProductPathName } from '../../../routes/helpers/RouteHelper'
import CartDropdownItem from './CartDropdownItem'
import { removeItem } from '../../../redux/actions/cartActions'

const CartDropdownContent = (props) => {
  const { removeItem } = props

  const handleOnClickTitle = (cartItemTitle) => {
    const productPathName = convertToProductPathName(cartItemTitle)
    props.history.push(`/product/${productPathName}`)
  }

  const redirectToCart = () => {
    props.history.push(ROUTES.CART)
  }

  const redirectToCheckout = () => {
    props.history.push(ROUTES.CHECKOUT)
  }

  return (
    <div className="cart-popover-menu">
      {props.addedItems.length > 0 ? (
        <div>
          {props.addedItems.map((cartItem, index) => {
            return (
              <CartDropdownItem
                key={index}
                cartItem={cartItem}
                discoverImg={DiscoverImg}
                handleOnClickTitle={handleOnClickTitle}
                removeItem={removeItem}
              />
            );
          })}
          <div>
            <div
              style={{
                color: "#666666",
                padding: "14px 0 14px 0",
                textAlign: "center"
              }}
            >
              <h5>
                <b>Subtotal: ${(props.total / 100).toFixed(2)}</b>
              </h5>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <SecondaryBtn onClick={redirectToCart}>View Cart</SecondaryBtn>
            </div>
            <div>
              <PrimaryBtn onClick={redirectToCheckout}>Checkout</PrimaryBtn>
            </div>
          </div>
        </div>
      ) : (
        <Row>
          <Col sm={12}>
            <p style={{ color: "#666666", fontSize: "16px" }}>
              No Products in the cart.
            </p>
          </Col>
        </Row>
      )}
    </div>
  );
}

const mapStateToProps = (/* state */) => ({})

const mapDispatchToProps = (dispatch) => ({
  removeItem: (id) => { dispatch(removeItem(id)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartDropdownContent))