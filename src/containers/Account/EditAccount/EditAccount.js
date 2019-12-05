import React from 'react'
import { useFirestoreUser, useFirebase } from "../../../hooks";

import EditAccountForm from './EditAccountForm'

const EditAccount = () => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  return (
    <div>
      <EditAccountForm firestoreUser={firestoreUser} />
    </div>
  );
}

export default EditAccount