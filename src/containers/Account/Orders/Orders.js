import React from "react";
import { useFirestoreUser, useFirebase } from "../../../hooks";
import Table from "react-bootstrap/Table";
import "./Orders.css";
import OrdersList from "./OrdersList";
import { StyledLink } from "../StyledComponents";
import { AccountContext } from "../AccountContext";

const Orders = () => {
  return (
    <AccountContext.Consumer>
      {value => (
        <>
          {value.firestoreUser.orders === undefined ? (
            <>
              <p>You don't have any orders yet. :(</p>
              <p>
                Checkout our <StyledLink>Services.</StyledLink>{" "}
              </p>
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
              <OrdersList orders={value.firestoreUser.orders} />
            </Table>
          )}
        </>
      )}
    </AccountContext.Consumer>
  );
};

export default Orders;
