import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import './Orders.css'
import OrdersList from './OrdersList'
import { ORDERS_DATA } from './OrdersData' // Dummy Data

const Orders = () => {
  const [orders, setOrders] = useState(ORDERS_DATA)

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
      <OrdersList orders={orders} />
    </Table>
  )
}

export default Orders