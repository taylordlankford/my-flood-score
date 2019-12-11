import React, { useContext } from 'react'
import { Title } from "../../../StyledComponents/StyledComponents"
import { AccountContext } from "../AccountContext";

const PaymentMethods = () => {
  const { firebase, firestoreUser } = useContext(AccountContext)
  
  return (
    <div>
      <Title>Payment Methods</Title>
    </div>
  );
}

export default PaymentMethods