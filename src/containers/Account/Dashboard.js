import React from 'react'
import { useFirestoreUser, useFirebase } from '../../hooks'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../routes/constants/routes'

const Dashboard = (props) => {
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser, loading } = userData

  const handleSignOut = (firebase) => {
    firebase.doSignOut()
      .then(() => {
        props.history.push(ROUTES.HOME)
      })
  }

  if (loading) {
    return 'loading...'
  }

  if (!firestoreUser) {
    return 'Unauthorized'
  }

  return (
    <div className="dashboard">
      <p>
        Hello <b>{firestoreUser.firstName + ' ' + firestoreUser.lastName}</b> (Not <b>{firestoreUser.firstName + ' ' + firestoreUser.lastName}</b>? <a className="inactive-link" onClick={() => handleSignOut(firebase)}>Log out</a>)
      </p>
      <p>
        From your account dashboard you can view your <Link to={ROUTES.ACCOUNT_ORDERS} className="inactive-link">recent orders</Link>, manage your <Link to={ROUTES.ACCOUNT_ADDRESSES} className="inactive-link">shipping and billing addresses</Link>, and <Link to={ROUTES.EDIT_ACCOUNT} className="inactive-link">edit your password and account details</Link>.
      </p>
    </div>
  )
}

export default Dashboard