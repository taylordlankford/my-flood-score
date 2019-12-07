import React, { useState } from "react";
import { useFirestoreUser, useFirebase } from "../../../../hooks";
import * as ROUTES from "../../../../routes/constants/routes";
import BillingAddressForm from "./BillingAddressForm"

const EditBillingAddress = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleUpdateUser = (e, streetAddress1, streetAddress2) => {
    const updatedFirestoreUser = {
      ...firestoreUser,
      streetAddress1,
      streetAddress2
    };
    // firebase.db.collection("users").doc(firestoreUser.uid).set(updatedFirestoreUser)
    firebase.doFirestoreSet("users", firestoreUser.uid, updatedFirestoreUser);
    props.history.push(ROUTES.ACCOUNT_ADDRESSES)
  };

  return <BillingAddressForm firestoreUser={firestoreUser} handleUpdateUser={handleUpdateUser} />;
};

export default EditBillingAddress;
