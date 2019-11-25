// CheckoutForm.js
import React from 'react'
import { injectStripe } from 'react-stripe-elements'
import { connect } from 'react-redux'

import { useFirebase, useFirestoreUser } from '../../hooks'
// import AddressSection from './AddressSection';
import CardSection from './CardSection'
import { setPaymentProcessing } from '../../redux/actions/cartActions'
import * as ROUTES from '../../routes/constants/routes'

const CheckoutForm = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  const { items, setPaymentProcessing } = props

  const handleSubmit = async (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    setPaymentProcessing(true)
    const { email, uid } = firestoreUser
    let { customerId } = firestoreUser

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    const cardElement = props.elements.getElement('card')

    // From here we cal call createPaymentMethod to create a PaymentMethod
    const { paymentMethod } = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      // billing_details: {name: 'Jenny Rosen'},
    })
    
    if (!customerId) { // We need to create customer
      console.log('creating customer')
      const customer = await firebase.doCreateCustomer({
        email,
        payment_method: paymentMethod.id,
        invoice_settings: {
          default_payment_method: paymentMethod.id,
        },
        metadata: {
          email,
          uid,
        },
      })
      console.log('customer', customer)
      customerId = customer.data.id
    } else { console.log('customer already exists') }

    let subItems = []
    let intentAmount = 0
    items.forEach(item => {
      console.log('item:', item)
      if (item.type === 'monthly') {
        subItems.push({ plan: item.plan })
      } else {
        intentAmount += item.price
      }
    });

    // Create subscription if necessary
    if (subItems.length > 0) {
      console.log('creating sub for items:', subItems)
      const subscription = await firebase.doCreateSubscription({
        customer: customerId,
        items: subItems,
        expand: ['latest_invoice.payment_intent'],
        metadata: {
          email,
          uid,
        },
      })
      console.log('subscription', subscription)
    }

    // Create Payment intent if necessary
    if (intentAmount > 0) {
      console.log('creating intent for amount of:', intentAmount)
      const intent = await firebase.doCreatePaymentIntent({
        amount: intentAmount,
        currency: 'usd',
        setup_future_usage: 'off_session',
        receipt_email: email,
        description: "My Flood Score",
        metadata: {
          email,
          uid,
        },
      })
      const client_secret = intent.data
      // Use client_secret to confirm card payment
      console.log('confirming card payment with CS:', client_secret)
      await props.stripe.confirmCardPayment(client_secret, {
        payment_method: {card: cardElement},
        // setup_future_usage: 'off_session'
      }).then(function(result) {
        if (result.error) {
          // Show error to your customer
          console.log('confirmCardPayment', result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            console.log('confirmCardPayment success, result:', result)
            // Show a success message to your customer
            // There's a risk of the customer closing the window before callback execution
            // Set up a webhook or plugin to listen for the payment_intent.succeeded event
            // to save the card to a Customer
          }
        }
      })
    }
    setPaymentProcessing(false)
    props.history.push(ROUTES.ACCOUNT)
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <AddressSection /> */}
      <CardSection />
      <input type="submit" id="submit-form" style={{ display: 'none' }} />
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    paymentProcessing: state.paymentProcessing,
  }
}
const mapDispatchToProps = (dispatch) => ({
  setPaymentProcessing: (value) => { dispatch(setPaymentProcessing(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(CheckoutForm))
