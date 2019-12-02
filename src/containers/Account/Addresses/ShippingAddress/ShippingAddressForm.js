import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const ShippingAddressForm = (props) => {
  return (
    <Col>
      <Row>
        Shipping Form
        <div onClick={props.disableShippingForm} className="link">
          Cancel
        </div>
      </Row>
    </Col>
  );
}

export default ShippingAddressForm