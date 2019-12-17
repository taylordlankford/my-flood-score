import React from "react";
import { useFirestoreUser, useFirebase } from "../../hooks";

export const CheckoutContext = React.createContext({});

export const CheckoutContextProvider = props => {
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
    <CheckoutContext.Provider value={{ firestoreUser, firebase }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};
