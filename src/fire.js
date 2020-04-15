import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyC0Lc2gdq7LQHdSoRXVLUizVZUmNLOjDxM",
  authDomain: "flood-score.firebaseapp.com",
  databaseURL: "https://flood-score.firebaseio.com",
  projectId: "flood-score",
  storageBucket: "loma-hillsborough",
  messagingSenderId: "317632209481",
  appId: "1:317632209481:web:7467d67cfd85b87f"
};

class Fire {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();
    this.functions = app.functions();
    // this.storage = app.storage();
  }

  /**
   * Firebase Storage API
   */
  getDownloadURL = async nffid => {
    return new Promise((resolve, reject) => {
      let bucketName = "gs://loma-hillsborough/";
      let fileName = "LOMA_" + nffid + ".jpg";
      console.log("FULL URL: ", fileName);

      let storage = this.app.storage();
      let storageRef = storage.ref();

      storageRef
        .child(fileName)
        .getDownloadURL()
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          console.log("Error: ", error);
        });
    });
  };

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doEmailUpdate = email => this.auth.currentUser.updateEmail(email);

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  doApplyActionCode = actionCode => this.auth.applyActionCode(actionCode);

  doCheckActionCode = actionCode => this.auth.checkActionCode(actionCode);

  doVerifyPasswordResetCode = actionCode =>
    this.auth.verifyPasswordResetCode(actionCode);

  doConfirmPasswordReset = (actionCode, newPassword) =>
    this.auth.confirmPasswordReset(actionCode, newPassword);

  // *** Firestore API ***

  doFirestoreUpdate = (collection, doc, updateObj) => {
    this.db
      .collection(collection)
      .doc(doc)
      .update(updateObj)
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  doFirestoreAdd = (collection, setObj, callback) => {
    return this.db
      .collection(collection)
      .add(setObj)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        if (callback) {
          callback();
        }
        return docRef;
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
        return error;
      });
  };

  doFirestoreSet = (collection, doc, setObj, callback) => {
    this.db
      .collection(collection)
      .doc(doc)
      .set(setObj)
      .then(function() {
        console.log("Document successfully written!");
        callback();
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  doFirestoreAddressRefGet = (county, address) => {
    const documents = []
    return this.db
      .collection("properties").doc('Florida')
      .collection('counties').doc(county)
      .collection('properties')
      .where("FULL_ADD", "==", address)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data())
          documents.push(doc.ref);
        });
        return documents
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  doFirestoreWhereGet = async (
    collection,
    whereField,
    whereOperation,
    whereValue
  ) => {
    console.log("doing firestore where get");
    const documents = [];
    const querySnapshot = await this.db
      .collection(collection)
      .where(whereField, whereOperation, whereValue)
      .get();
    return querySnapshot;
    // querySnapshot.forEach(async (doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(doc.id, " => ", doc.data());
    //     documents.push(doc.data())
    //   })
    //   return documents
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });
  };

  doFirestoreCollectionGet = collection => {
    const documents = [];
    return this.db
      .collection(collection)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          documents.push(doc.data());
        });
        return documents;
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  doFirestoreDocGet = (collection, doc, getOptions) => {
    return this.db
      .collection(collection)
      .doc(doc)
      .get(getOptions)
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          return doc.data();
        } else {
          console.log("No such document!");
          return "No such document!";
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
        return error;
      });
  };

  // *** Functions API ***
  doAddUser = () => this.functions.httpsCallable("addUser");

  doCreatePaymentIntent = async intent => {
    const paymentIntent = this.functions.httpsCallable("createPaymentIntent");
    return await paymentIntent({ intent });
  };

  doCreateCustomer = async customer => {
    const createCustomer = this.functions.httpsCallable("createCustomer");
    return await createCustomer({ customer });
  };

  doUpdateCustomerDefaultPaymentMethod = async (customer, paymentMethodId) => {
    const updateCustomerDefaultPaymentMethod = this.functions.httpsCallable(
      "updateCustomerDefaultPaymentMethod"
    );
    return await updateCustomerDefaultPaymentMethod({
      customer,
      paymentMethodId
    });
  };

  doCreateSubscription = async subscription => {
    const createSubscription = this.functions.httpsCallable(
      "createSubscription"
    );
    return await createSubscription({ subscription });
  };

  doGetSubscriptions = async customerId => {
    const getSubscriptions = this.functions.httpsCallable("getSubscriptions");
    return await getSubscriptions({ customerId });
  };

  doCancelSubscription = async subscriptionId => {
    const cancelSubscription = this.functions.httpsCallable(
      "cancelSubscription"
    );
    return await cancelSubscription({ subscriptionId });
  };

  /*** Payment methods API ***/
  doGetPaymentMethod = async paymentMethodId => {
    const getPaymentMethod = this.functions.httpsCallable("getPaymentMethod");
    return await getPaymentMethod({ paymentMethodId });
  };

  doGetPaymentMethods = async customerId => {
    const getPaymentMethods = this.functions.httpsCallable("getPaymentMethods");
    return await getPaymentMethods({ customerId });
  };

  doAttachPaymentMethod = async (paymentMethodId, customerId) => {
    const attachPaymentMethod = this.functions.httpsCallable(
      "attachPaymentMethod"
    );
    return await attachPaymentMethod({ paymentMethodId, customerId });
  };

  doDetachPaymentMethod = async paymentMethodId => {
    const detachPaymentMethod = this.functions.httpsCallable(
      "detatchPaymentMethod"
    );
    return await detachPaymentMethod({ paymentMethodId });
  };

  /*** EOF Payment methods API ***/

  doGetCustomer = async customerId => {
    const getCustomer = this.functions.httpsCallable("getCustomer");
    return await getCustomer({ customerId });
  };

  doDeleteCustomer = async customerId => {
    const deleteCustomer = this.functions.httpsCallable("deleteCustomer");
    return await deleteCustomer({ customerId });
  };
}

export default Fire;
