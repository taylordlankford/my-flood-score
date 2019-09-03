import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import DiscoverImg from '../../assets/images/Discover.svg'

import './Products.css'
import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'

const ProductBox = (props) => {
  const handleAddToCart = () => {
    const { history } = props
    history.push(ROUTES.CHECKOUT)
  }
  return (
    <Container>
      <Row>
        <Col>
          <img src={DiscoverImg} className="productImg" alt="Discover Product" />
        </Col>
        <Col>
          <div className="breadcrumb-container">
            <Link to={ROUTES.HOME}>Home</Link>&nbsp; / &nbsp;<Link to={ROUTES.DISCOVER}>Discover - Homeowner</Link>
          </div>
          <h1 className="product-title">Discover – Homeowner</h1>
          <p className="price">$0.00</p>
          <div className="quantity">
            <label className="screen-reader-text">Discover - Homeowner quantity</label>
            <input type="number" className="input-text qty text" step="1" min="1" max="100" defaultValue="1" name="quantity" title="Qty" size="4" inputMode="numeric" />
          </div>
          <Button onClick={handleAddToCart} variant="primary" type="submit" name="add-to-cart" value="191" className="add-to-cart-button">ADD TO CART</Button>
          <div className="product_meta">	
            <span>Category: <Link to={ROUTES.DISCOVER}>Homeowner</Link></span>	
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const DiscoverPage = () => {
  const firebase = useFirebase()
  const { history } = useReactRouter()
  return (
  <div>
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col sm={8}>
          <ProductBox history={history} />
        </Col>
        <Col sm={4}>
          Side Bar
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default DiscoverPage
