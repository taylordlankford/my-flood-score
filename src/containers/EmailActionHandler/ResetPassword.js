import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../../hooks'

import * as ROUTES from '../../constants/routes'

const ResetPassword = ({ history, email, setEmail, actionCode }) => {
  const firebase = useFirebase()
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleConfirmPasswordReset = () => {
    // Save the new password.
    firebase.doConfirmPasswordReset(actionCode, newPassword).then(function(resp) {
      console.log('Password reset has been confirmed and new password updated.')

      // TODO: Display a link back to the app, or sign-in the user directly
      // if the page belongs to the same domain as the app:
      firebase.doSignInWithEmailAndPassword(email, newPassword);
      setSuccess(true)

      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch(function(error) {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
      console.log('Error occurred during confirmation. The code might have expired or the password is too weak.', error)
      setError(error.message)
    });
  }
  if (success) {
    return (
      <div>
        <h2>Success</h2>
        <Button onClick={() => history.push(ROUTES.HOME)}>
          Continue to Home Page
        </Button>
      </div>
    )
  }
  return (
    <div>
      <h1 className="authHeader">Reset Password</h1>
      { /* eslint-disable-next-line no-script-url */ }
      <Form className="greyBox" action="javascript:void(0);" onSubmit={handleConfirmPasswordReset}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="Enter new password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Reset Password
        </Button>
        {error && <p>{error}</p>}
      </Form>
    </div>
  )
}

export default ResetPassword
