import React from "react";

// Stripe
import { Elements } from 'react-stripe-elements'

// Children
import InjectedNewCardForm from "./InjectedNewCardForm"

const NewCardFormModal = props => {
  return (
    <Elements>
      <InjectedNewCardForm
        show={props.show}
        onhide={props.onhide}
        setProcessing={() => props.setProcessing()}
        setShowNewCardForm={() => props.setShowNewCardForm()}
        customer={props.customer}
        fetchdata={props.fetchdata}
      />
    </Elements>
  );
};

export default NewCardFormModal
