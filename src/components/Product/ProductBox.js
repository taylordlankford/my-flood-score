import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import BreadCrumb from './BreadCrumb'
import DiscoverImg from '../../assets/images/Discover.svg'

const ProductBox = (props) => {
  const {
    handleAddToCart,
    title,
    category,
    breadcrumb,
    price,
    img,
  } = props
  const showPrice = (price.type === 'once') ? price.amount.toFixed(2) : `${price.amount.toFixed(2)} / ${price.type}`
  return (
    <Container>
      <Row>
        <Col>
          <img src={img ? img : DiscoverImg} className="productImg" alt="Discover Product" />
        </Col>
        <Col>
          <BreadCrumb data={breadcrumb} />
          <h1 className="product-title">{title}</h1>
          <p className="price">${showPrice}</p>
          <div className="quantity">
            <label className="screen-reader-text">{title} quantity</label>
            <input type="number" className="input-text qty text" step="1" min="1" max="1" defaultValue="1" name="quantity" title="Qty" size="4" inputMode="numeric" />
          </div>
          <Button onClick={handleAddToCart} variant="primary" type="submit" name="add-to-cart" value="191" className="add-to-cart-button">ADD TO CART</Button>
          <div className="product_meta">	
            <span>Category: <Link to={category.link}>{category.name}</Link></span>	
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default withRouter(ProductBox)
