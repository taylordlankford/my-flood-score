import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import { useFirebase } from '../../hooks'


const SignUpPage = () => {
  const firebase = useFirebase()
  const { history } = useReactRouter()

  const [email, setEmail] = useState('')
  const [passwordOne, setPasswordOne] = useState('')
  const [passwordTwo, setPasswordTwo] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [error, setError] = useState(null)

  const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      firstName === '' ||
      lastName === ''

  const onSubmit = event => {
    firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        console.log('on signUp authUser:', authUser)
        firebase.doSignInWithEmailAndPassword(email, passwordOne)
        .then(data => {
          const authUser = data.user
          console.log('authUser after sing in', authUser)
          const collection = 'users'
          const doc = authUser.uid
          const setObj = {
            uid: authUser.uid,
            firstName,
            lastName,
          }
          firebase.doFirestoreSet(collection, doc, setObj, () => history.push(ROUTES.HOME))
        })
      })
      .catch(error => {
        setError(error)
      })

    event.preventDefault()
  }

  return (
    <div>
      <h1 className="authHeader">SignUp</h1>
      <form onSubmit={onSubmit}>
        <input
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={(e) => setPasswordOne(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    </div>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.CHECKOUT_FREE}>Sign Up</Link>
  </p>
)
export default SignUpPage
export { SignUpLink }
