import React from "react";
import { useFirestoreUser, useFirebase } from "../../hooks";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Spinner";

export const AccountContext = React.createContext({});

export const AccountContextProvider = props => {
  const firebase = useFirebase();
  const userData = useFirestoreUser();
  const { firestoreUser, loading } = userData;

  if (loading) {
    return (
      <Container
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
          textAlign: "center",
          color: "#666666"
        }}
      >
        <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
          style={{
            marginLeft: "-15px",
            marginRight: "15px"
          }}
        />
        <span style={{ fontSize: "28px" }}>Loading...</span>
      </Container>
    );
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
