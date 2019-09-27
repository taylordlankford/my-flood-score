import React, { useState } from 'react'
import qs from 'qs'

import ResetPassword from './ResetPassword'
import DiscoverReport from '../Reports/DiscoverReport'

import { useFirebase, useFirestoreUser } from '../../hooks'

const EmailAction = ({ match, location, history }) => {
  const firebase = useFirebase()
  const firestoreUser = useFirestoreUser()
  console.log('firestoreUSer', firestoreUser)

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [ran, setRan] = useState(false)
  const [recoverEmailSuccess, setRecoverEmailSuccess] = useState(false)
  const [property, setProperty] = useState(false)

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
      accountEmail = email;
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
    // let restoredEmail = null;
    // Confirm the action code is valid.
    firebase.doCheckActionCode(actionCode).then(function(info) {
      // Get the restored email address.
      // restoredEmail = info['data']['email'];
  
      // Revert to the old email.
      return firebase.doApplyActionCode(actionCode);
    }).then(function() {
      // Account email reverted to restoredEmail
  
      // TODO: Display a confirmation message to the user.
      setRecoverEmailSuccess(true)
      // You might also want to give the user the option to reset their password
      // in case the account was compromised:
      // firebase.doPasswordReset(restoredEmail).then(function() {
      //   console.log('Password reset confirmation sent. Ask user to check their email.')
      // }).catch(function(error) {
      //   console.log('Error encountered while sending password reset code:', error)
      //   setError(error.message)
      // });
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
      // Check if user has used free credit

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


  // if (error !== null) {
  //   return <h2>{error}</h2>
  // }  // TODO: Uncomment
  if (!property && !firestoreUser.loading) {
    firestoreUser.firestoreUser.propertyRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("property Document data:", doc.data());
          setProperty(doc.data())
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error)
        setError(error.messsage)
    })
  }
  if (mode === 'resetPassword') {
    return <ResetPassword history={history} email={email} setEmail={setEmail} actionCode={actionCode} />
  }
  if (mode === 'recoverEmail') {
    return (
      (recoverEmailSuccess) ? <h2>Email Recovered Successful</h2> : <h2>Problem with email recovery</h2>
    )
  }

  if (mode === 'verifyEmail' && property) {
    return <DiscoverReport {...property} />
  } else if (mode === 'verifyEmail') {
    return 'verifying email.'
  } 
  return (
    <h1>
      Email Action Page
    </h1>
  )
}

export default EmailAction
