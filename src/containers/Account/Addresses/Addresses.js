import React, { useState } from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";

import { AddressesContainer } from "./AddressesStyles";
import Row from "react-bootstrap/Row";

import BillingAddress from "./BillingAddress/BillingAddress";
import BillingAddressForm from "./BillingAddress/BillingAddressForm";
import ShippingAddress from "./ShippingAddress/ShippingAddress";
import ShippingAddressForm from "./ShippingAddress/ShippingAddressForm";

import "./Addresses.css";
import { firestore } from "firebase";

const Addresses = () => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleUpdateUser = (e, streetAddress1, streetAddress2) => {
    console.log(firestoreUser)
    const updatedFireStoreUser = {
      ...firestoreUser,
      streetAddress1,
      streetAddress2
    }

    firebase.db.collection("users").doc(firestoreUser.uid).set(updatedFireStoreUser)
  };

  const RenderAddressForm = () => {
    if (showBillingForm) {
      return (
        <BillingAddressForm
          disableBillingForm={() => setShowBillingForm(false)}
          firestoreUser={firestoreUser}
          handleUpdateUser={handleUpdateUser}
        />
      );
    } else if (showShippingForm) {
      return (
        <ShippingAddressForm
          disableShippingForm={() => setShowShippingForm(false)}
          firestoreUser={firestoreUser}
        />
      );
    } else if ((showShippingForm && showBillingForm) === false) {
      return (
        <Row>
          <BillingAddress
            enableBillingForm={() => setShowBillingForm(true)}
            firestoreUser={firestoreUser}
          />
          <ShippingAddress
            enableShippingForm={() => setShowShippingForm(true)}
          />
        </Row>
      );
    }
  };

  return (
    <AddressesContainer>
      {console.log(firestoreUser)}
      <Row>
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
      </Row>
      {RenderAddressForm()}
    </AddressesContainer>
  );
};

export default Addresses;
