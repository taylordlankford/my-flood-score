import React, { useState, useContext, useEffect } from "react";
import CheckoutForm from "./CheckoutForm"
import RCCheckoutForm from './RCCheckoutForm/RCCheckoutForm'
import { CheckoutContext } from "./CheckoutContext"

const CheckoutGateway = (props) => {
  const { history } = props
  const { firestoreUser, firebase } = useContext(CheckoutContext);
  const [returningCustomer, setReturningCustomer] = useState(false)

  useEffect(() => {
    checkReturningCustomer()
  }, [])

  const isCustomer =
    !(firestoreUser.customerId === "" ||
    typeof firestoreUser.customerId === "undefined" ||
    firestoreUser.customerId === null);

  const checkReturningCustomer = () => {
    console.log(firestoreUser)
    console.log('isCustomer:', isCustomer)
    if (isCustomer) {
      setReturningCustomer(true)
    }
    else {
      setReturningCustomer(false)
    }
  } 

  return (
    <>
      {returningCustomer ? (
        <RCCheckoutForm history={history} />
      ) : (
        <CheckoutForm history={history} />
      )}
    </>
  )
}

export default CheckoutGateway