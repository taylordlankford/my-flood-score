import React, { useState } from 'react'
import useReactRouter from 'use-react-router'

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
    <h1>SignIn</h1>
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>

      {error && <p>{error.message}</p>}
    </form>
    <SignUpLink />
    <PasswordForgetLink />
  </div>
  )
}

export default SignInPage
