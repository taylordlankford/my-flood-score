import React from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";

import { TiArrowUnsorted } from "react-icons/ti";
import Table from "react-bootstrap/Table";
import "./Orders.css";
import OrdersList from "./OrdersList";

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
    <Table striped responsive borderless>
      <thead>
        <tr>
          <th>Order</th>
          <th>Date</th>
          <th>Status</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      {firestoreUser.orders === "undefined" ? (
        "You don't have any orders yet. :("
      ) : (
        <OrdersList orders={firestoreUser.orders} />
      )}
    </Table>
  );
};

export default Orders;
