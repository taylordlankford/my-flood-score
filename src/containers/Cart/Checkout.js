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
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First name *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last name *</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridCompanyName">
        <Form.Label>Company name (optional)</Form.Label>
        <Form.Control />
      </Form.Group>

      <Form.Group disabled controlId="formGridCountry">
        <Form.Label>Country *</Form.Label>
        <Form.Control disabled required defaultValue="United States (US)" />
      </Form.Group>

      <Form.Group controlId="formGridAddress1">
        <Form.Label>Street address *</Form.Label>
        <Form.Control required placeholder="House number and street name" />
      </Form.Group>

      <Form.Group controlId="formGridAddress2">
        <Form.Control required placeholder="Apartment, suite, unit etc. (optional)" />
      </Form.Group>

      <Form.Group controlId="formGridCity">
        <Form.Label>City / Town *</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>

      <Form.Group controlId="formGridState">
        <Form.Label>State *</Form.Label>
        <Form.Control required as="select">
          <option>Select an option...</option>
          <option>...</option>
        </Form.Control >
      </Form.Group>

      <Form.Group controlId="formGridZip">
        <Form.Label>Zip *</Form.Label>
        <Form.Control type="text" required />
      </Form.Group>

      <Form.Group controlId="formGridPhone">
        <Form.Label>Phone *</Form.Label>
        <Form.Control type="tel" required />
      </Form.Group>

      <Form.Group controlId="formGridEmail">
        <Form.Label>Email address *</Form.Label>
        <Form.Control required type="email" />
      </Form.Group>

      <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Additional information</h3>

      <Form.Group controlId="formGridNotes">
        <Form.Label>Order notes (optional)</Form.Label>
        <Form.Control type="text" as="textarea" rows="4" placeholder="Notes about your order, e.g. special notes for delivery." />
      </Form.Group>

    </Form>
  )
}

const Order = () => {
  return (
    <div className="order-details">
      <p className="cart-item">Discover - Homeowner 	<span style={{ fontWeight: '700' }}>× 1</span> <span className="cart-amount">$0.00</span></p>
      <p className="cart-Subtotal">Subtotal <span className="cart-amount">$0.00</span></p>
      <p className="cart-total">Total <span className="cart-amount">$0.00</span></p>
      <Button variant="primary" type="submit" className="place-order-button">
        PLACE ORDER
      </Button>
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
