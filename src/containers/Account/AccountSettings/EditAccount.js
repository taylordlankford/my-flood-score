import React from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import * as ROUTES from "../../../routes/constants/routes";
import EditAccountForm from "./EditAccountForm";

const EditAccount = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleOnClick = (e, firstName, lastName, companyName, email) => {
    e.preventDefault();

    const updatedUser = {
      ...firestoreUser,
      firstName,
      lastName,
      companyName,
      email
    };

    firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);
    props.history.push(ROUTES.ACCOUNT_SETTINGS);
  };

  return (
    <EditAccountForm
      firestoreUser={firestoreUser}
      handleOnClick={handleOnClick}
    />
  );
};

export default EditAccount;
