import React, { useState, useContext, useEffect } from "react";
import CheckoutForm from "./CheckoutForm"
import RCCheckoutForm from './RCCheckoutForm/RCCheckoutForm'
import { CheckoutContext } from "./CheckoutContext"

const CheckoutGateway = () => {
  const { firestoreUser, firebase } = useContext(CheckoutContext);
  const [returningCustomer, setReturningCustomer] = useState(false)

  useEffect(() => {
    checkReturningCustomer()
  }, [])

  const checkReturningCustomer = () => {
    if (firestoreUser.customerId !== '' || typeof firestoreUser !== 'undefined') {
      setReturningCustomer(true)
    }
  } 

  return (
    <>
      {returningCustomer ? (
        <RCCheckoutForm />
      ) : (
        <CheckoutForm />
      )}
    </>
  )
}

export default CheckoutGateway