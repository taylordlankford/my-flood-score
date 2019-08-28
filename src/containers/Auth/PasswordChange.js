import React, { useState } from 'react'
import useReactRouter from 'use-react-router'

import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'

const PasswordChangeForm = () => {
  const firebase = useFirebase()

  const { history } = useReactRouter()

  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [error, setError] = useState(null)

  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === ''

  const onSubmit = event => {
    firebase
      .doPasswordUpdate(passwordOne)
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
    <h1>Password Change</h1>
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={(e) => setPasswordOne(e.target.value)}
        type="password"
        placeholder="New Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        type="password"
        placeholder="Confirm New Password"
      />
      <button disabled={isInvalid} type="submit">
        Reset My Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  </div>
  )
}

export default PasswordChangeForm
