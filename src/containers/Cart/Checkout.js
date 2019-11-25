import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import InjectedCheckoutForm from './CheckoutForm'
import CardSection from './CardSection'

import './Cart.css'
// import * as ROUTES from '../../constants/routes'
import * as ROUTES from '../../routes/constants/routes'
import { useFirebase } from '../../hooks'

const BillingDetails = () => {
  const handleOrderSubmit = () => {
    this.props.stripe.createSource({
      type: 'card',
      owner: {
        name: 'Jenny Rosen',
      },
    })
    .then((source) => {
      console.log('source:', source)
    })
  }
  return (
    // eslint-disable-next-line no-script-url
    <Form action="javascript:void(0);" onSubmit={handleOrderSubmit} id="order-form">
      <CardSection />
      <input type="submit" id="submit-form" style={{ display: 'none' }} />
    </Form>
  )
}

const Order = ({ paymentProcessing }) => {
  return (
    <div className="order-details">
      <p className="cart-item">Discover - Homeowner 	<span style={{ fontWeight: '700' }}>× 1</span> <span className="cart-amount">$0.00</span></p>
      <p className="cart-Subtotal">Subtotal <span className="cart-amount">$0.00</span></p>
      <p className="cart-total">Total <span className="cart-amount">$0.00</span></p>
      {paymentProcessing
        ? <Button variant="primary" type="submit" className="place-order-button">Processing...</Button>
        : (
          <label htmlFor="submit-form" tabIndex="0" className="place-order-button add-to-cart-button btn btn-primary">
            PLACE ORDER
          </label>
        )
      }
    </div>
  )
}

class CheckoutPage extends React.Component {
  // const firebase = useFirebase()
  // const { history } = useReactRouter()

  render() {
    const { items, total, history, paymentProcessing } = this.props
    console.log('items', items)
    console.log('paymentProcessing:', paymentProcessing)
    return (
      <div>
        <Elements>
          <Container style={{ 'marginTop': '64px' }}>
            <Row>
              <Col>
                <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Billing details</h3>
                <InjectedCheckoutForm items={items} total={total} history={history} />
                {/* <BillingDetails /> */}
              </Col>
              <Col>
                <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Your order</h3>
                <Order paymentProcessing={paymentProcessing} />
              </Col>
            </Row>
          </Container>
        </Elements>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.addedItems,
    total: state.total,
    paymentProcessing: state.paymentProcessing,
  }
}
const mapDispatchToProps = (/* dispatch */) => {
  return null
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
