import React, { useContext, useEffect, useState } from "react";
import { Container, Title, } from "../../../StyledComponents/StyledComponents";
import { AccountContext } from "../AccountContext";
import PaymentMethodsList from "./PaymentMethodsList"

const PaymentMethods = () => {
  const { firebase, firestoreUser } = useContext(AccountContext);
  const [paymentMethods, setPaymentMethods] = useState(null)

  useEffect(() => {
    if (firestoreUser.customerId !== "" || firestoreUser.customerId !== undefined) {
      firebase
        .doGetPaymentMethods(firestoreUser.customerId)
        .then(paymentMethods => {
          setPaymentMethods(paymentMethods.data.paymentMethods);
        });
    }
  }, []);

  const removePaymentMethod = (e) => {
    e.preventDefault()
    alert('clicked remove')
  }

  return (
    <Container>
      <Title>Your Payment Methods</Title>
      {console.log("State: ", paymentMethods)}
      {paymentMethods === null ? (
        <p>No payment methods.</p>
      ) : (
        <PaymentMethodsList paymentMethods={paymentMethods} removePaymentMethod={removePaymentMethod} />
      )}
    </Container>
  );
};

export default PaymentMethods;
