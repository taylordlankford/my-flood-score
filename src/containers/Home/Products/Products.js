import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import { PRODUCTS_DATA } from './ProductsData'
import Product from './Product'

const Products = () => {
  const [products] = useState(PRODUCTS_DATA)

  const isEven = (value) => (
    (value % 2 == 0) ? true : false
  )

  return (
    <Container style={{ paddingTop: '60px', margin: '0 auto', maxWidth: '748px' }}>
      {products.map((product, index) => (
        <Product
          key={index}
          product={product}
          isEven={isEven}
        />
      ))}
    </Container>
  )
}

export default Products