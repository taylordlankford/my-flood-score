import React from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";

import Table from "react-bootstrap/Table";
import "./Orders.css";
import OrdersList from "./OrdersList";

import { StyledLink } from "../StyledComponents";

const Orders = () => {
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
    <>
      {firestoreUser.orders === undefined ? (
        <>
          <p>You don't have any orders yet. :(</p>
          <p>Checkout our <StyledLink>Services.</StyledLink> </p>
        </>
      ) : (
        <Table responsive borderless>
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <OrdersList orders={firestoreUser.orders} />
        </Table>
      )}
    </>
  );
};

export default Orders;
