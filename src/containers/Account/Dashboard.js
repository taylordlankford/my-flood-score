import React from 'react'
import { useFirestoreUser, useFirebase } from '../../hooks'

import * as ROUTES from '../../routes/constants/routes'

const Dashboard = ({ history }) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

  const handleSignOut = (firebase) => {
    firebase.doSignOut()
      .then(() => {
        history.push(ROUTES.HOME)
      })
  }

  if (loading) {
    return 'loading...'
  }

  if (!firestoreUser) {
    return 'Unauthorized'
  }

  return (
    <div>
      <p>
        Hello <b>{firestoreUser.firstName + ' ' + firestoreUser.lastName}</b> (Not <b>{firestoreUser.firstName + ' ' + firestoreUser.lastName}</b>? <a onClick={() => handleSignOut(firebase)}>Log out</a>)
      </p>
      <p>
        From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.
      </p>
    </div>
  )
}

export default Dashboard