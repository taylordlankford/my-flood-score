import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const BillingAddressForm = (props) => {
  return (
    <Col>
      <Row>
        Billing Form
        <div onClick={props.disableBillingForm} className="link">
          Cancel
        </div>
      </Row>
    </Col>
  )
}

export default BillingAddressForm