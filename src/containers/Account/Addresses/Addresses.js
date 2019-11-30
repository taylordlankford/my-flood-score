import React, { useState } from 'react'
import './Addresses.css'
import Row from 'react-bootstrap/Row'

import BillingAddress from './BillingAddress/BillingAddress'
import BillingAddressForm from './BillingAddress/BillingAddressForm'
import ShippingAddress from './ShippingAddress/ShippingAddress'
import ShippingAddressForm from './ShippingAddress/ShippingAddressForm'

const Addresses = () => {
  const [showBillingForm, setShowBillingForm] = useState(false)
  const [showShippingForm, setShowShippingForm] = useState(false)

  const enableBillingForm = () => {
    setShowBillingForm(true)
  }

  const disableBillingForm = () => {
    setShowBillingForm(false)
  }

  const enableShippingForm = () => {
    setShowShippingForm(true)
  }

  const disableShippingForm = () => {
    setShowShippingForm(false)
  }

  return (
    <div className="addresses-container">
      <Row>
        <p>The following addresses will be used on the checkout page by default.</p>
      </Row>
      {
        (showBillingForm || showShippingForm)
          ?
          <Row>
            <BillingAddressForm
              disableBillingForm={disableBillingForm} />

            <ShippingAddressForm
              disableShippingForm={disableShippingForm} />
          </Row>
          :
          <Row>
            <BillingAddress
              enableBillingForm={enableBillingForm} />

            <ShippingAddress
              enableShippingForm={enableShippingForm} />
          </Row>
      }
    </div>
  )
}

export default Addresses