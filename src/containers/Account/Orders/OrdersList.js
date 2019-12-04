import React, { useState, useEffect } from "react";
import * as ROUTES from '../../../routes/constants/routes'
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Moment from "react-moment";

const OrdersList = props => {
  const getQuantity = items => {
    let totalQuantity = 0;
    items.forEach(item => {
      totalQuantity += item.quantity;
    });
    return totalQuantity;
  };

  return (
    <tbody>
      {console.log(props.orders)}
      {props.orders.map((order, index) => (
        <tr key={index}>
          <td>
            <Link to="" className="order-number">
              #{index + 1}
            </Link>
          </td>
          <td>
            <Moment format="MM/DD/YYYY">
              {new Date(order.timestamp.seconds * 1000)}
            </Moment>
          </td>
          <td id="order-status">
            {/*order.orderStatus*/}
            {order.processed !== undefined ? order.processed : "processed"}
          </td>
          <td>
            ${(order.amount / 100).toFixed(2)} for {getQuantity(order.items)}{" "}
            items
          </td>
          <td>
            <Button variant="btn btn-primary" className="order-action">
              View
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrdersList;
