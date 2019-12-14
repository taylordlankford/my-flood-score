import React from "react";

// Stripe
import { Elements } from 'react-stripe-elements'

// Children
import InjectedNewCardForm from "./InjectedNewCardForm"

const NewCardFormModal = props => {
  return (
    <Elements>
      <InjectedNewCardForm show={props.show} onHide={props.onHide} customer={props.customer} />
    </Elements>
  );
};

export default NewCardFormModal
