import React from 'react'
import { Elements } from 'react-stripe-elements'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Order from './Order'
import InjectedCheckoutForm from './CheckoutForm'
import './Cart.css'

class CheckoutPage extends React.Component {
  render() {
    const {
      items,
      total,
      history,
      paymentProcessing,
    } = this.props
    return (
      <div>
        <Elements>
          <Container style={{ 'paddingTop': '64px' }}>
            <Row>
              <Col>
                <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Billing details</h3>
                <InjectedCheckoutForm items={items} total={total} history={history} />
              </Col>
              <Col>
                <h3 style={{ color: '#0D238E', fontWeight: 'bold', margin: '0 0 1.5rem' }} >Your order</h3>
                <Order items={items} total={total} paymentProcessing={paymentProcessing} />
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
