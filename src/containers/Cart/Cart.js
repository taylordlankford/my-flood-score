import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import NumericInput from 'react-numeric-input';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DiscoverImg from '../../assets/images/Discover.svg'
import { removeItem, addQuantity, subtractQuantity } from '../../redux/actions/cartActions'
import { MdClose } from 'react-icons/md'

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

    const handleRemoveItem = (product) => {
        removeItem(product.id)
    }
    
    let DPRODUCTS = items.map((product, index) => (
        <Row key={index} className="cartItemsCSS">
            {/* <span> {total = total + product.price}</span> */}
            <Col className="cartImages">
              <img src={product.img ? product.img : DiscoverImg} className="productImg" id="sPImg" />
            </Col>
            <Col sm={4}>
              <h1 className="product-title">
                {product.title}
              </h1>
            </Col>
            <Col>
              <p className="price">
                ${product.price / 100}
              </p>
            </Col>
            {/* <Col sm={2} className="product-title"></Col> */}
            {/* <input type="number" className="input-text qty text" step="1" min="0" max="100" value={product.quantity} name="quantity" title="Qty" size="4" inputMode="numeric" /> */}
            <Col>
              <div className="numeric-container">
                  <NumericInput
                      className="input-text qty text"
                      select={(event) => event.preventDefault()}
                      min={0}
                      max={10}
                      value={product.quantity}
                      onChange={(value) => handleQtyChange(value, product, addQuantity, subtractQuantity)}
                  />
              </div>
            </Col>
            <Col className="price">
                ${product.price / 100 * product.quantity}
            </Col>
            <Col className="actions">
                <div onClick={() => handleRemoveItem(product)}>
                  <MdClose></MdClose>
                </div>
            </Col>
        </Row>
    ))

    let gotoShop = () => {
        props.history.push('/shop')
    }

    let gotoCheckout = () => {
        props.history.push('/checkout')
    }


    return (
        <div>
            <Container className="mt-5">
                <div className="cartFlexBox">
                    <div className="FlexItems">
                    “Discover – Homeowner” has been added to your cart.
                    </div>
                    <div className="FlexItems flexButton">
                        <Button variant="primary" onClick={gotoShop}>CONTINUE SHOPPING</Button>
                    </div>
                </div>
            </Container>
            <div className="cart-container mt-5">
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

                    <Col sm={4}>
                        <div className="order-details">
                            <div className="cartSubTotalAmount">
                                Subtotal
                            <span className="cart-amount">$ {total / 100}</span>
                            </div>
                            <div className="cartTotalAmount">
                                Total
                            <span className="cart-amount">${total / 100}</span>
                            </div>
                            <Col sm={12}></Col>
                            <label onClick={gotoCheckout} htmlFor="submit-form" tabIndex="0" id="cartPlaceOrderBtn" className={"place-order-button add-to-cart-button btn btn-primary btn-primary"} >
                                Proceed to checkout
                         </label>
                        </div>
                    </Col>
                </Row>
            </div>
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