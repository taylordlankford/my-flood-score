import React, { useState } from 'react'
import qs from 'qs'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { useFirebase } from '../../hooks'
import * as ROUTES from '../../constants/routes'

const EmailAction = ({ match, location, history }) => {
  const firebase = useFirebase()

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [ran, setRan] = useState(false)


  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  console.log('params', params)
  const {
    mode, // Get the action to complete.
    oobCode, // Get the one-time code from the query parameter.
    continueUrl, // (Optional) Get the continue URL from the query parameter if available.
    lang, // (Optional) Get the language code if available.
  } = params
  const actionCode = oobCode

  if (!ran) {
    switch (mode) {
      case 'resetPassword':
        // Display reset password handler and UI.
        handleResetPassword(actionCode, continueUrl, lang);
        setRan(true)
        break;
      case 'recoverEmail':
        // Display email recovery handler and UI.
        handleRecoverEmail(actionCode, lang);
        setRan(true)
        break;
      case 'verifyEmail':
        // Display email verification handler and UI.
        handleVerifyEmail(actionCode, continueUrl, lang);
        setRan(true)
        break;
      default:
        // Error: invalid mode.
        setRan(true)
    }
  }

  function handleResetPassword(actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var accountEmail;
    // Verify the password reset code is valid.
    firebase.doVerifyPasswordResetCode(actionCode).then(function(email) {
      var accountEmail = email;
      setEmail(accountEmail)
  
      // TODO: Show the reset screen with the user's email and ask the user for
      // the new password.
  
    }).catch(function(error) {
      console.log('Invalid or expired action code. Ask user to try to reset the password again', error)
      setError(error.message)
    });
  }

  function handleRecoverEmail(actionCode, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    var restoredEmail = null;
    // Confirm the action code is valid.
    firebase.doCheckActionCode(actionCode).then(function(info) {
      // Get the restored email address.
      restoredEmail = info['data']['email'];
  
      // Revert to the old email.
      return firebase.doApplyActionCode(actionCode);
    }).then(function() {
      // Account email reverted to restoredEmail
  
      // TODO: Display a confirmation message to the user.
  
      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      firebase.doPasswordReset(restoredEmail).then(function() {
        console.log('Password reset confirmation sent. Ask user to check their email.')
      }).catch(function(error) {
        console.log('Error encountered while sending password reset code:', error)
        setError(error.message)
      });
    }).catch(function(error) {
      console.log('invalid code, error:', error)
      setError(error.message)
    });
  }

  function handleVerifyEmail(actionCode, continueUrl, lang) {
    // Localize the UI to the selected language as determined by the lang
    // parameter.
    // Try to apply the email verification code.
    firebase.doApplyActionCode(actionCode).then(function(resp) {
      console.log('resp', resp)
      console.log('email address has been verified')
  
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
  
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    }).catch(function(error) {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
      console.log('doApplyActionCode error', error)
      setError(error.message)
    });
  }

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

  // if (error !== null) {
  //   return (
  //     <h2>{error}</h2>
  //   )
  // }
  if (mode === 'resetPassword') {
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
          {error && <p>{error.message}</p>}
        </Form>
      </div>
    )
  }
  return (
    <h1>
      Email Action Page
    </h1>
  )
}

export default EmailAction
