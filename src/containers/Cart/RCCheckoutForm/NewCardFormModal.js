import React from "react";

// Stripe
import { Elements } from 'react-stripe-elements'

// Children
import InjectedNewCardForm from "./InjectedNewCardForm"

const NewCardFormModal = props => {
  const {
    customer,
    show,
    handleNewCardProcessing,
    setShowNewCardForm,
    onHide,
  } = props;

  return (
    <Elements>
      <InjectedNewCardForm
        show={show}
        onHide={onHide}
        setShowNewCardForm={setShowNewCardForm}
        customer={customer}
      />
    </Elements>
  );
};

export default NewCardFormModal
