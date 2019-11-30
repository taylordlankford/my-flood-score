import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const BillingAddress = (props) => {
  return (
    <Col>
      <Row>
        <span>
          <h3 className="title">Billing Address</h3>
        </span>
        <span style={{ paddingLeft: '20px' }}>
          <div onClick={props.enableBillingForm} className="link">
            Edit
          </div>
        </span>
      </Row>
    </Col>
  )
}

export default BillingAddress