import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './Auth.css'
import { SignUpLink } from './SignUp'
import { PasswordForgetLink } from './PasswordForget'
import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'

const SignInPage = () => {
  const firebase = useFirebase()

  const { history } = useReactRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const isInvalid = password === '' || email === ''

  const onSubmit = event => {
    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ROUTES.HOME)
      })
      .catch(error => {
        setError(error)
      })

    event.preventDefault()
  }

  return (
  <div>
    <h1 className="authHeader">Login</h1>
      <Form className="greyBox" onSubmit={onSubmit} >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          LOG IN
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
      <SignUpLink />
      <PasswordForgetLink />
  </div>
  )
}

export default SignInPage
