import React from 'react'
import { withRouter } from 'react-router-dom'
import OddProduct from './OddProduct'
import EvenProduct from './EvenProduct'
import { convertToProductPathName } from '../../../routes/helpers/RouteHelper'

const Product = (props) => {
  const gotoProduct = (productName) => {
    props.history.push(`/${convertToProductPathName(productName)}`)
  }

  return (
    (props.isEven(props.product.id)) ?
      <EvenProduct
        key={props.key}
        product={props.product}
        gotoProduct={gotoProduct}
      />
      :
      <OddProduct
        key={props.key}
        product={props.product}
        gotoProduct={gotoProduct}
      />
  )
}

export default withRouter(Product)