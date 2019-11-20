import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Product.css'
import AddToCartButton from './AddToCartButton'
import BreadCrumb from './BreadCrumb'
import DiscoverImg from '../../assets/images/Discover.svg'
import NumericInput from 'react-numeric-input'

const ProductBox = (props) => {
  const {
    category,
    breadcrumb
  } = props

  const [quantity, setQuantity] = useState(1)

  const handleQtyChange = (value) => {
    setQuantity(value)
  }

  return (
    <Container>
      <Row>
        <Col>
          <img
            src={props.img ? props.img : DiscoverImg}
            className="productImg"
            alt="Discover Product" />
        </Col>
        <Col>
          <BreadCrumb
            data={breadcrumb} />
          <h1 className="product-title">
            {props.item.title}
          </h1>
          <p className="price">
            ${(props.item.price / 100).toFixed(2)} / {props.item.type}
          </p>
          <div className="quantity">
            <label className="screen-reader-text">
              {props.item.title} quantity
            </label>
            <NumericInput
              className="input-text qty text"
              select={(event) => event.preventDefault()}
              min={1}
              max={10}
              value={quantity}
              onChange={(value) => handleQtyChange(value)} />
          </div>
          <AddToCartButton
            quantity={quantity}
            id={props.item.id} />
          <div className="product_meta">	
            <span>Category: <Link to={category.link}>{category.name}</Link></span>	
          </div>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (/* state */) => ({})

export default connect(mapStateToProps)(withRouter(ProductBox))