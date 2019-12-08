import React from "react";
import { useFirestoreUser, useFirebase } from "../../hooks";

export const AccountContext = React.createContext({});

export const AccountContextProvider = props => {
  const firebase = useFirebase();
  const userData = useFirestoreUser();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  return (
    <AccountContext.Provider value={{ firestoreUser, firebase }}>
      {props.children}
    </AccountContext.Provider>
  );
};
