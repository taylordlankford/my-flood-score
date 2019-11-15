import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'

import { useFirestoreUser } from '../../hooks'

import './Product.css'
import * as ROUTES from '../../routes/constants/routes'
import { addToCart } from '../../redux/actions/cartActions'

const handleAddToCart = ({ addToCart, id, history }) => {
  if (id == 0) {
    history.push(ROUTES.ACCOUNT)
    return
  }
  addToCart(id)
  history.push(ROUTES.CART)
 }

const AddToCartButton = (props) => {
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  console.log('add to cart fire user', firestoreUser)
  console.log('add to cart button props:', props)
  return (
    <Button
      onClick={(firestoreUser) ? () => handleAddToCart(props) : () => props.history.push(ROUTES.CHECKOUT_FREE)}
      variant="primary"
      type="submit"
      name="add-to-cart"
      className="add-to-cart-button">
        {firestoreUser ? 'ADD TO CART' : 'Sign Up'}
    </Button>
  )
}

const mapStateToProps = (/* state */) => {
  return null
}
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => { dispatch(addToCart(id)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddToCartButton))

