import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeItem, addQuantity, subtractQuantity } from '../../redux/actions/cartActions'
import CartItem from './CartItem'
import OrderDetails from './OrderDetails'
import CartNotifcation from './CartNotification'
import { CHECKOUT, SHOP } from '../../constants/routes'

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
    props.history.push(SHOP)
  }

  const gotoCheckout = () => {
    props.history.push(CHECKOUT)
  }

  const handleRemoveItem = (product) => {
    removeItem(product.id)
  }

  let DPRODUCTS = items.map((product, index) => (
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
    <div>
      <CartNotifcation
        items={items}
        gotoShop={gotoShop} />

      <Container className="mt-5">
        <Row>
          <Col sm={8}>
            <Row className="cart-header">
              <Col></Col>
              <Col sm={4}>Product</Col>
              <Col>Price</Col>
              <Col>Quantity</Col>
              <Col>Total</Col>
              <Col></Col>
            </Row>
            <hr />
            {DPRODUCTS}
          </Col>

          <OrderDetails
            gotoCheckout={gotoCheckout}
            total={total} />

        </Row>
      </Container >
    </div>

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
