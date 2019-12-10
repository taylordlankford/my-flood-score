import React from "react";
import Table from "react-bootstrap/Table";
import "./Orders.css";
import OrdersList from "./OrdersList";
import { Title, StyledLink } from "../../../StyledComponents/StyledComponents"
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
            <>
              <Title>Orders</Title>
              <Table responsive borderless>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <OrdersList orders={value.firestoreUser.orders} />
              </Table>
            </>
          )}
        </>
      )}
    </AccountContext.Consumer>
  );
};

export default Orders;
