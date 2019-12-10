import React, { useEffect, useContext, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Title } from '../../../StyledComponents/StyledComponents'
import { AccountContext } from '../AccountContext'
import Subscription from './Subscription'
import Notification from "../../../components/Notifications/Notification"

const Subscriptions = () => {
  const { firestoreUser, firebase } = useContext(AccountContext)
  const [subs, setSubs] = useState(null)
  

  useEffect(() => {
    console.log('firestoreUser', firestoreUser)
    if (typeof firestoreUser.customerId !== 'undefined') {
      firebase.doGetSubscriptions(firestoreUser.customerId)
        .then((subs) => {
          console.log('subs', subs)
          setSubs(subs.data.subs)
        })
    }
  }, [])

  if (!subs) {
    return (
      'No subscriptions yet'
    )
  }
  return (
    <>
    <Notification />
    <Table responsive borderless>
      <thead>
        <tr>
          <th>Plan</th>
          <th>Crated At</th>
          <th>Next Bill Due</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {subs.map((sub, index) => <Subscription sub={sub} index={index} />)}
      </tbody>
    </Table>
    </>
  )
}

export default Subscriptions
