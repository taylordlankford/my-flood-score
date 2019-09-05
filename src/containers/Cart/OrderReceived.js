import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './Cart.css'
import * as ROUTES from '../../constants/routes'
import { useFirebase, useFirebaseAuthentication } from '../../hooks'


const OrderReceived = (props) => {
  const firebase = useFirebase()
  const { history } = useReactRouter()
  const user = useFirebaseAuthentication()
  // const { emailVerified } = user
  console.log('user', user)
  const { state } = props.location
  console.log('order received props:', state)
  let emailVerified = null
  try {
    emailVerified = user.emailVerified
  } catch (err) {
    return <h1>No User Found</h1>
  }
  if (emailVerified) {
    return (
      <div>
        <h1>
          Thank you, {state.firstName}
        </h1>
      </div>
    )
  }
  return (
  <div>
    <h1>
      Thank you, {state.firstName}
    </h1>
    <h2>Please verify your email</h2>
  </div>
  )
}

export default OrderReceived
