import React, { useEffect, useContext, useState } from 'react'
import { Title } from "../../../StyledComponents/StyledComponents"
import { AccountContext } from "../AccountContext"

const Subscription = ({sub}) => (
  <p>{sub.id}</p>
)

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
      'waiting on subs'
    )
  }
  return (
    subs.map((sub) => <Subscription sub={sub} />)
  )
}

export default Subscriptions
