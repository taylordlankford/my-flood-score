import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const OrdersList = (props) => {
  return (
    <tbody>
      {
        props.orders.map((order, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to="" className="order-number">
                  #{order.orderNumber}
                </Link>
              </td>
              <td>{order.orderDate}</td>
              <td id="order-status">{order.orderStatus}</td>
              <td>${order.orderTotal} for {order.orderQuantity} items</td>
              <td><Button variant="btn btn-primary">View</Button></td>
            </tr>
          )
        })
      }
    </tbody>
  )
}

export default OrdersList