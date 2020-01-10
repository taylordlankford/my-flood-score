import React, { useState } from 'react'
import useReactRouter from 'use-react-router'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../routes/constants/routes'
import { useFirebase } from '../../hooks'
import Container from 'react-bootstrap/Container'

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
          // Update display name
          let currentUser = firebase.auth().currentUser;
          currentUser.updateProfile({
            displayName: firstName
          }).then(() => {
            console.log('Successfully updated display name.')
          }).catch(error => {
            console.log(error)
          })

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
    <Container>
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
    </Container>
  )
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.CHECKOUT_FREE}>Sign Up</Link>
  </p>
)
export default SignUpPage
export { SignUpLink }
