import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import DiscoverImg from '../../assets/images/Discover.svg'
import { removeItem, addQuantity, subtractQuantity } from '../../redux/actions/cartActions'

const Cart = (props) => {
    const { items, total } = props
    console.log('props in cart.js', props)
    
    let DPRODUCTS = items.map((product, index) => (
        <Row key={index} className="cartItemsCSS">
            {/* <span> {total = total + product.price}</span> */}
            <Col sm={2} className="cartImages"><img src={product.img ? product.img : DiscoverImg} className="productImg" id="sPImg" /></Col>
            <Col sm={4}><h1 className="product-title">{product.title}</h1></Col>
            <Col sm={2}><p className="price" >${product.price}</p></Col>
            <Col sm={2} className="product-title"  >
                <input type="number" className="input-text qty text" step="1" min="0" max="100" value={product.quantity} name="quantity" title="Qty" size="4" inputMode="numeric" />
            </Col>
            <Col sm={2} className="price">${product.price}</Col>
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
            <Container className="mt-5">
                <Row>
                    <Col sm={8}>
                        <div>

                            <Row>
                                <Col sm={2}></Col>
                                <Col sm={4}>Product</Col>
                                <Col sm={2}>Price</Col>
                                <Col sm={2}>Qunatity</Col>
                                <Col sm={2}>Total</Col>
                            </Row>
                            <hr />

                            {DPRODUCTS}


                        </div>
                    </Col>

                    <Col sm={4}>
                        <div className="order-details">
                            <div className="cartSubTotalAmount">
                                Subtotal
                            <span className="cart-amount">$ {total}</span>
                            </div>
                            <div className="cartTotalAmount">
                                Total
                            <span className="cart-amount">${total}</span>
                            </div>
                            <Col sm={12}></Col>
                            <label onClick={gotoCheckout} htmlFor="submit-form" tabIndex="0" id="cartPlaceOrderBtn" className={"place-order-button add-to-cart-button btn btn-primary btn-primary"} >
                                Proceed to checkout
                         </label>
                        </div>
                    </Col>
                </Row>
            </Container>
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