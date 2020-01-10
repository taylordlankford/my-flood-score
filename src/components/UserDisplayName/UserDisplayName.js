import React, { useState, useEffect } from 'react'
import useReactRouter from "use-react-router";
import { useSelector } from 'react-redux'
import * as ROUTES from '../../routes/constants/routes'
import styled from 'styled-components'
import { useFirebase, useFirestoreUser } from '../../hooks'

const UserDisplayName = () => {
  const { history } = useReactRouter()
  const firebase = useFirebase()
  const userData = useFirestoreUser()
  const { firestoreUser } = userData
  const userReducer = useSelector(state => state.userReducer)
  const [displayName, setDisplayName] = useState(``)

  useEffect(() => {
    console.log('firestore user: ', firestoreUser)
    console.log('firebase user: ', firebase.auth.currentUser)

    if (userReducer.update == true) {
      updateDisplayName()
    } else {
      setDisplayName(`Hi, ${firebase.auth.currentUser.displayName}`)
    }

    // Only re-mount when we detect change on the firestoreUser or the redux
    // action changes.
  }, [firebase, firestoreUser, userReducer])

  const updateDisplayName = () => {
    let currentUser = firebase.auth.currentUser
    if (currentUser!= null && firestoreUser != null) {
      currentUser.updateProfile({
        displayName: firestoreUser.firstName
      }).then(() => {
        setDisplayName(`Hi, ${currentUser.displayName}`)
        console.log('success')
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <A onClick={() => history.push(ROUTES.ACCOUNT_DASHBOARD)}>
      {displayName}
    </A>
  )
}

const A = styled.span`
  padding-top: 10px;
  margin: 18px;
  text-decoration: none;
  color: #666666;
  font-size: 18px;

  &:link {
    text-decoration: none;
  }

  &:visited {
    text-decoration: none;
  }

  &:hover {
    color: #0d238e;
    transition: 0.5s !important;
    cursor: pointer !important;
    text-decoration: none !important;
  }

  &:active {
    text-decoration: underline;
  }
`

export default UserDisplayName;