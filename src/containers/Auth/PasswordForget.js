import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useReactRouter from 'use-react-router'

import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'

const PasswordForgetForm = () => {
  const firebase = useFirebase()

  const { history } = useReactRouter()

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)

  const isInvalid = email === ''

  const onSubmit = event => {
    firebase
      .doPasswordReset(email)
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
    <h1>Password Foget</h1>
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email Address"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  </div>
  )
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetForm
export { PasswordForgetLink }
