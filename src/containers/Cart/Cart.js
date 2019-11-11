import React from 'react'
import { withRouter } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import { connect } from 'react-redux'
import { removeItem, addQuantity, subtractQuantity } from '../../redux/actions/cartActions'

import CartItem from './CartItem'
import OrderDetails from './OrderDetails'
import CartNotifcation from './CartNotification'

const handleQtyChange = (newValue, product, addQuantity, subtractQuantity) => {
  console.log('old value', product)
  console.log('new value', newValue)
  if (newValue < product.quantity) { // subtracted quantity
    console.log('subtracting')
    subtractQuantity(product.id)
  } else if (newValue > product.quantity) { // added quantity
    console.log('adding')
    addQuantity(product.id)
  }
}

const Cart = (props) => {
  const {
    items,
    total,
    addQuantity,
    subtractQuantity,
    removeItem
  } = props

  console.log('props in cart.js', props)

  const gotoShop = () => {
    props.history.push(ROUTES.SHOP)
  }

  const gotoCheckout = () => {
    props.history.push(ROUTES.CHECKOUT)
  }

  const handleRemoveItem = (product) => {
    removeItem(product.id)
  }

  const DPRODUCTS = items.map((product, index) => (
    <CartItem
      product={product}
      key={index}
      handleRemoveItem={handleRemoveItem}
      addQuantity={addQuantity}
      subtractQuantity={subtractQuantity}
      handleQtyChange={handleQtyChange}
    />
  ))

  return (
    <Container className="cart-container">
      <CartNotifcation
        items={items}
        gotoShop={gotoShop} />

      {
        items.length === 0 ?
          <Container>
            <p>Your cart is currently empty.</p>
            <Button onClick={gotoShop}>
              RETURN TO SHOP
            </Button>
          </Container>
          :
          <Container className="mt-5">
            <Row>
              <Col sm={8}>
                <Row className="cart-header">
                  <Col sm={1}></Col>
                  <Col sm={2}></Col>
                  <Col sm={4}>Product</Col>
                  <Col>Price</Col>
                  <Col>Quantity</Col>
                  <Col>Total</Col>
                </Row>
                <hr />
                {DPRODUCTS}
              </Col>

              <OrderDetails
                gotoCheckout={gotoCheckout}
                total={total} />

            </Row>
          </Container >
      }
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Cart))
