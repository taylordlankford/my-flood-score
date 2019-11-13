import React from 'react'
import { withRouter } from 'react-router'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import NumericInput from 'react-numeric-input';
import DiscoverImg from '../../assets/images/Discover.svg'
import { MdClose } from 'react-icons/md'

import { convertToProductPathName }  from '../../routes/helpers/RouteHelper'

const CartItem = (props) => {
  const handleOnClickTitle = (cartItemTitle) => {
    const productPathName = convertToProductPathName(cartItemTitle)
    props.history.push(`/product/${productPathName}`)
  }

  return (
    <Row key={props.index} className="cartItemsCSS">
      {/* <span> {total = total + product.price}</span> */}
      <Col sm={1} className="actions">
        <div onClick={() => props.handleRemoveItem(props.product)}>
          <MdClose />
        </div>
      </Col>
      <Col sm={2} className="cartImages">
        <img 
          src={props.product.img ? props.product.img : DiscoverImg}
          className="productImg"
          id="sPImg" />
      </Col>
      <Col sm={4}>
        <h1 
          className="product-title"
          onClick={() => handleOnClickTitle(props.product.title)}>
          {props.product.title}
        </h1>
      </Col>
      <Col>
        <p className="price">
          ${props.product.price / 100}
        </p>
      </Col>
      {/* <Col sm={2} className="product-title"></Col> */}
      {/* <input type="number" className="input-text qty text" step="1" min="0" max="100" value={product.quantity} name="quantity" title="Qty" size="4" inputMode="numeric" /> */}
      <Col>
        <div className="quantity-container">
          <NumericInput
            className="input-text qty text"
            select={(event) => event.preventDefault()}
            min={0}
            max={10}
            value={props.product.quantity}
            onChange={(value) => props.handleQtyChange(value, props.product, props.addQuantity, props.subtractQuantity)}
          />
        </div>
      </Col>
      <Col className="price">
        ${props.product.price / 100 * props.product.quantity}
      </Col>
    </Row>
  )
}

export default withRouter(CartItem)