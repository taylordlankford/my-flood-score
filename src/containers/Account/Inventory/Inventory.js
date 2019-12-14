import React, { useEffect, useContext, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Title } from '../../../StyledComponents/StyledComponents'
import { AccountContext } from '../AccountContext'
import Item from './Item'
import Notification from "../../../components/Notifications/Notification"

const Inventory = () => {
  const { firestoreUser, firebase } = useContext(AccountContext)
  const items = firestoreUser.inventory

  if (!items) {
    return (
      'No Inventroy yet'
    )
  }
  return (
    <>
    <Notification />
    <Table responsive borderless>
      <thead>
        <tr>
          <th>Product</th>
          <th>Description</th>
          <th>Inventory</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => <Item item={item} index={index} />)}
      </tbody>
    </Table>
    </>
  )
}

export default Inventory
