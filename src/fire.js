import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyC0Lc2gdq7LQHdSoRXVLUizVZUmNLOjDxM",
  authDomain: "flood-score.firebaseapp.com",
  databaseURL: "https://flood-score.firebaseio.com",
  projectId: "flood-score",
  storageBucket: "",
  messagingSenderId: "317632209481",
  appId: "1:317632209481:web:7467d67cfd85b87f"
}

class Fire {
  constructor() {
    app.initializeApp(firebaseConfig)

    this.auth = app.auth()
    this.db = app.firestore()
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)

  doApplyActionCode = actionCode =>
    this.auth.applyActionCode(actionCode)

  doCheckActionCode = actionCode =>
    this.auth.checkActionCode(actionCode)

  doVerifyPasswordResetCode = actionCode =>
    this.auth.verifyPasswordResetCode(actionCode)

  doConfirmPasswordReset = (actionCode, newPassword) =>
    this.auth.confirmPasswordReset(actionCode, newPassword)

  // *** User API ***

  doFirestoreSet = (collection, doc, setObj, callback) => {
    this.db.collection(collection).doc(doc).set(setObj)
    .then(function() {
      console.log("Document successfully written!")
      callback()
    })
    .catch(function(error) {
      console.error("Error writing document: ", error)
    })
  }

}

export default Fire