import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Moment from "react-moment";

const OrdersList = props => {
  return (
    <tbody>
      {props.orders.map((order, index) =>
        order.items.map((item, key) => (
          <tr key={key}>
            <td>
              <Link to="" className="order-number">
                #{index}
              </Link>
            </td>
            <td>
              <Moment format="MM/DD/YYYY">
                {new Date(order.timestamp.seconds * 1000)}
              </Moment>
            </td>
            <td id="order-status">
              {/*order.orderStatus*/}
              {(order.processed !== undefined) ? order.processed : "processed"}
            </td>
            <td>
              ${(order.amount / 100).toFixed(2)} for {item.quantity} items
            </td>
            <td>
              <Button variant="btn btn-primary" className="order-action">
                View
              </Button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default OrdersList;
