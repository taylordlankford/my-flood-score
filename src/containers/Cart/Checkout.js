import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Cart.css'
import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'

const BillingDetails = () => {
  const handleOrderSubmit = () => {
    var form = document.getElementById('order-form') // can I get this through a prop?
    var order = {};
    for( var i = 0; i < form.elements.length - 1; i++ ) { // length - 1 for submit element
      var e = form.elements[i];
      order[e.name] = e.value
    }
    console.log('order', order)
  }
  return (
    // eslint-disable-next-line no-script-url
    <Form action="javascript:void(0);" onSubmit={handleOrderSubmit} id="order-form">
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
        <Form.Control name="streetAddress2" required placeholder="Apartment, suite, unit etc. (optional)" />
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

      <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Additional information</h3>

      <Form.Group controlId="billingNotes">
        <Form.Label>Order notes (optional)</Form.Label>
        <Form.Control name="notes" type="text" as="textarea" rows="4" placeholder="Notes about your order, e.g. special notes for delivery." />
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

const CheckoutPage = () => {
  const firebase = useFirebase()
  const { history } = useReactRouter()

  return (
  <div>
    <Container style={{ 'marginTop': '64px' }}>
      <Row>
        <Col>
          <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Billing details</h3>
          <BillingDetails />
        </Col>
        <Col>
          <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Your order</h3>
          <Order />
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default CheckoutPage
