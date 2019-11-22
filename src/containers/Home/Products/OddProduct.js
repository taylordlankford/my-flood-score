import React from 'react'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styled from 'styled-components'

const OddProduct = (props) => {
  const Button = styled.a`
    &,
    &:link,
    &:visited {
      color: #FFFFFF;
      cursor: pointer;
      background-color: #55B96A;
      background-image: linear-gradient(90deg, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.2) 50%);
      font-size: 0.94rem;
      font-weight: 700;
      border-radius: 5px;
      border: none;
      display: inline-block;
      padding: 0.62rem 1.25rem;
      text-decoration: none;
      text-transform: uppercase;
      background-size: 230%;
      transition: all 0.4s;
    }

    &:hover {
      background-position: 100%;
      color: white;
    }

    &:active {
      outline: none;
      transform: scale(0.9);
    }
  `;

  return (
    <Row key={props.key} style={{ marginBottom: '60px' }}>
      <Col style={{ textAlign: 'right' }}>
        <h3 className="left-product-title">
          {
            (props.product.name === 'Reduce') ?
              'Reduce or Eliminate'
              :
              props.product.name
          }
        </h3>
        <hr style={{ border: '1px solid #c4c4c4' }} />
        <p>{props.product.description}</p>
        <Button
          onClick={() => props.gotoProduct(props.product.name)}
          style={{ color: '#fff' }}>
          Learn More
          </Button>
      </Col>
      <Col style={{ textAlign: 'left' }}>
        <img
          src={props.product.imgSrc}
          className="productImg"
          id="sPImg" />
      </Col>
    </Row>
  )
}

export default OddProduct