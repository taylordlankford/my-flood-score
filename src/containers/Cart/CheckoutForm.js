// CheckoutForm.js
import React from 'react'
import { injectStripe } from 'react-stripe-elements'

import { useFirebase, useFirestoreUser } from '../../hooks'
// import AddressSection from './AddressSection';
import CardSection from './CardSection'

const CheckoutForm = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  const handleSubmit = async (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault()
    const { email, uid } = firestoreUser
    let { customerId } = firestoreUser
    // get client secret key:
    // const intent = await firebase.doCreatePaymentIntent({
    //   amount: props.total,
    //   currency: 'usd',
    //   setup_future_usage: 'off_session',
    //   receipt_email: email,
    //   description: "My Flood Score",
    //   metadata: {
    //     email,
    //     uid,
    //   },
    // })
    // const client_secret = intent.data
    // console.log('intent client_secret:', client_secret)

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    // becase only one is allowed.
    // See our getElement documentation for more:
    // https://stripe.com/docs/stripe-js/reference#elements-get-element
    const cardElement = props.elements.getElement('card')

    // From here we cal call createPaymentMethod to create a PaymentMethod
    // See our createPaymentMethod documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
    const { paymentMethod } = await props.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      // billing_details: {name: 'Jenny Rosen'},
    })
    // console.log('paymentMethod', paymentMethod)
    
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

    // now lets create subscription
    console.log('creating sub with customer id:', customerId)
    const subscription = await firebase.doCreateSubscription({
      customer: customerId,
      items: [
        {
          plan: 'plan_GD4tFIrEfqOPLx',
        },
      ],
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        email,
        uid,
      },
    })
    console.log('subscription', subscription)

    // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
    // See our confirmCardPayment documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
    // props.stripe.confirmCardPayment(client_secret, {
    //   payment_method: {card: cardElement},
    //   // setup_future_usage: 'off_session'
    // }).then(function(result) {
    //   if (result.error) {
    //     // Show error to your customer
    //     console.log('confirmCardPayment', result.error.message);
    //   } else {
    //     if (result.paymentIntent.status === 'succeeded') {
    //       console.log('confirmCardPayment success, result:', result)
    //       // Show a success message to your customer
    //       // There's a risk of the customer closing the window before callback execution
    //       // Set up a webhook or plugin to listen for the payment_intent.succeeded event
    //       // to save the card to a Customer
    
    //       // The PaymentMethod ID can be found on result.paymentIntent.payment_method
    //     }
    //   }
    // });

    // You can also use confirmCardSetup with the SetupIntents API.
    // See our confirmCardSetup documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
    // props.stripe.confirmCardSetup(client_secret, {
    //   payment_method: {
    //     card: cardElement,
    //   },
    // }).then((res) => {
    //   console.log('confirm card setup res:', res)
    // })

    // You can also use createToken to create tokens.
    // See our tokens documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-token
    // With createToken, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    // props.stripe.createToken({type: 'card', name: 'Jenny Rosen'})
      // .then((token) => {
      //   console.log('token:', token)
      // })

    // token type can optionally be inferred if there is only one Element
    // with which to create tokens
    // props.stripe.createToken({name: 'Jenny Rosen'});

    // You can also use createSource to create Sources.
    // See our Sources documentation for more:
    // https://stripe.com/docs/stripe-js/reference#stripe-create-source
    // With createSource, you will not need to pass in the reference to
    // the Element. It will be inferred automatically.
    // props.stripe.createSource({
    //   type: 'card',
    //   owner: {
    //     name: 'Jenny Rosen',
    //   },
    // })
    // .then((data) => {
    //   console.log('data:', data)
    //   const { client_secret } = data.source
    //   console.log('client_secret', client_secret)
    //   // props.stripe.confirmCardPayment(client_secret, {
    //   //   payment_method: {
    //   //     card: cardElement,
    //   //   },
    //   // })
    //   // .then((res) => {
    //   //   console.log('res:', res)
    //   // })
    // })
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <AddressSection /> */}
      <CardSection />
      <input type="submit" id="submit-form" style={{ display: 'none' }} />
    </form>
  )
}

export default injectStripe(CheckoutForm)
