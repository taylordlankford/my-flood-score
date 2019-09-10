import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import './Cart.css'
import * as ROUTES from '../../constants/routes'
import { useFirebase, useStateValue } from '../../hooks'

const BillingDetails = (props) => {
  // const [error, setError] = useState(null)
  const [{ error }, dispatch] = useStateValue()

  const handleOrderSubmit = () => {
    dispatch({
      type: 'changeError',
      newError: null,
    })
    const { history, firebase } = props
    var form = document.getElementById('order-form') // can I get this through a prop?
    var order = {};
    for( var i = 0; i < form.elements.length - 1; i++ ) { // length - 1 for submit element
      var e = form.elements[i];
      order[e.name] = e.value
    }
    console.log('order', order)
    firebase
      .doCreateUserWithEmailAndPassword(order.email, order.password)
      .then(authUser => {
        console.log('on signUp authUser:', authUser)
        firebase.doSignInWithEmailAndPassword(order.email, order.password)
        .then(data => {
          const authUser = data.user
          // send verification email and update firestore
          authUser.sendEmailVerification()
          console.log('authUser after sing in', authUser)
          const collection = 'users'
          const doc = authUser.uid
          delete order.password;
          const setObj = {
            uid: authUser.uid,
            ...order,
            usedFreeCredit: false,
          }
          firebase.doFirestoreSet(collection, doc, setObj, () => history.push(ROUTES.ORDER_RECEIVED, order))
        })
        .catch(err => {
          console.log('error:', err)
          dispatch({ type: 'changeError', newError: err.message })
        })
      })
      .catch(err => {
        console.log('error:', err)
        dispatch({ type: 'changeError', newError: err.message })
      })
  }
  return (
    // eslint-disable-next-line no-script-url
    <Form action="javascript:void(0);" onSubmit={handleOrderSubmit} id="order-form">
      {/* {error && <Alert className="sticky" variant={'danger'}>{error.message}</Alert>} */}
      <Form.Row>
        <Form.Group as={Col} controlId="billingFirstName">
          <Form.Label>First name *</Form.Label>
          <Form.Control name="firstName" required type="text" />
        </Form.Group>

        <Form.Group as={Col} controlId="billingLastName">
          <Form.Label>Last name *</Form.Label>
          <Form.Control name="lastName" required type="text" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="billingCompanyName">
        <Form.Label>Company name (optional)</Form.Label>
        <Form.Control name="companyName" />
      </Form.Group>

      <Form.Group disabled controlId="billingCountry">
        <Form.Label>Country *</Form.Label>
        <Form.Control name="country" disabled required defaultValue="United States (US)" />
      </Form.Group>

      <Form.Group controlId="billingAddress1">
        <Form.Label>Street address *</Form.Label>
        <Form.Control name="streetAddress" required placeholder="House number and street name" />
      </Form.Group>

      <Form.Group controlId="billingAddress2">
        <Form.Control name="streetAddress2" placeholder="Apartment, suite, unit etc. (optional)" />
      </Form.Group>

      <Form.Group controlId="billingCity">
        <Form.Label>City / Town *</Form.Label>
        <Form.Control name="city" type="text" required />
      </Form.Group>

      <Form.Group controlId="billingState">
        <Form.Label>State *</Form.Label>
        <Form.Control name="state" required as="select">
          <option>Select an option...</option>
          <option>...</option>
        </Form.Control >
      </Form.Group>

      <Form.Group controlId="billingZip">
        <Form.Label>Zip *</Form.Label>
        <Form.Control name="zip" type="text" required />
      </Form.Group>

      <Form.Group controlId="billingPhone">
        <Form.Label>Phone *</Form.Label>
        <Form.Control name="phone" type="tel" required />
      </Form.Group>

      <Form.Group controlId="billingEmail">
        <Form.Label>Email address *</Form.Label>
        <Form.Control name="email" required type="email" />
      </Form.Group>

      <Form.Group controlId="billingPassword">
        <Form.Label>Passsword *</Form.Label>
        <Form.Control name="password" required type="password" />
      </Form.Group>

      <input type="submit" id="submit-form" style={{ display: 'none' }} />
    </Form>
  )
}

const Order = () => {
  return (
    <div className="order-details">
      <p className="cart-item">Discover - Homeowner 	<span style={{ fontWeight: '700' }}>× 1</span> <span className="cart-amount">$0.00</span></p>
      <p className="cart-Subtotal">Subtotal <span className="cart-amount">$0.00</span></p>
      <p className="cart-total">Total <span className="cart-amount">$0.00</span></p>
      <label htmlFor="submit-form" tabIndex="0" className="place-order-button add-to-cart-button btn btn-primary">
        PLACE ORDER
      </label>
      {/* <Button variant="primary" type="submit" className="place-order-button">PLACE ORDER</Button> */}
    </div>
  )
}

const CheckoutFree = () => {
  const firebase = useFirebase()
  const { history } = useReactRouter()

  return (
  <div>
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col>
          <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Order details</h3>
          <BillingDetails history={history} firebase={firebase} />
        </Col>
        <Col className="sticky">
          <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Your order</h3>
          <Order />
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default CheckoutFree
