import React from 'react'
import Button from 'react-bootstrap/Button'

import * as ROUTES from '../../constants/routes'
import { useFirestoreUser, useFirebase } from '../../hooks'

const Account = ({ history }) => {
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
    <>
      <h1>{firestoreUser.firstName}{"'"}s Account</h1>
      <Button onClick={() => handleSignOut(firebase)}>
        Sign Out
      </Button>
    </>

  )
}

export default Account
