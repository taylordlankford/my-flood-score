import React from "react";
import * as ROUTES from "../../../routes/constants/routes";
import { Link } from "react-router-dom";
import { TransitionBtn } from "../../../StyledComponents/StyledComponents"
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
      {props.orders.map((order, index) => (
        <tr key={index}>
          <td>
            <Link
              to={ROUTES.ACCOUNT_ORDER + "/" + (index + 1).toString()}
              className="order-number"
            >
              #{index + 1}
            </Link>
          </td>
          <td>
            <Moment format="MM/DD/YYYY">
              {new Date(order.timestamp.seconds * 1000)}
            </Moment>
          </td>
          <td id="order-status">
            {order.type !== undefined ? order.type : ""}
          </td>
          <td>
            ${(order.amount / 100).toFixed(2)} for {getQuantity(order.items)}{" "}
            items
          </td>
          <td>
            <TransitionBtn>
              <Link
                style={{ color: "#fff" }}
                to={ROUTES.ACCOUNT_ORDER + "/" + (index + 1).toString()}
              >
                View
              </Link>
            </TransitionBtn>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrdersList;
