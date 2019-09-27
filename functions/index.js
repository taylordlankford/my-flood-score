const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const express = require('express');
const cors = require('cors')({origin: true});
const app = express();

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token);

function charge(req, res) {
    const body = JSON.parse(req.body);
    const token = body.token.id;
    const amount = body.charge.amount;
    const currency = body.charge.currency;

    // Charge card
    stripe.charges.create({
        amount,
        currency,
        description: 'Firebase Example',
        source: token,
    }).then(charge => {
        return send(res, 200, {
            message: 'Success',
            charge,
        });
    }).catch(err => {
        console.log(err);
        send(res, 500, {
            error: err.message,
        });
    });
}


function send(res, code, body) {
    res.send({
        statusCode: code,
        headers: {'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(body),
    });
}

app.use(cors);
app.post('/', (req, res) => {

    // Catch any unexpected errors to prevent crashing
    try {
        charge(req, res);
    } catch(e) {
        console.log(e);
        send(res, 500, {
            error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
        });
    }
});

const addUser = (data, context) => {
  const { uid } = context.auth
  const { userDetails } = data
  userDetails.uid = uid
  userAddress = userDetails.streetAddress1.split(', ')
  userAddress[3] = Number(userAddress[3])
  console.log('userAddress', userAddress)

  var propertiesRef = admin.firestore().collection("properties")
  const properties = propertiesRef.where("PROP_ADD", "==", userAddress[0])
  return properties.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const key = doc.id
        const data = doc.data()
        
        if (data.PROP_ADD === userAddress[0]
          && data.PROP_CITY === userAddress[1]
          && data.PROP_STATE === userAddress[2]
          && data.PROP_ZIP === userAddress[3]) {
            userDetails.propertyRef = propertiesRef.doc(key)
        } else {
          console.log('nope not a match')
        }
      })
      // eslint-disable-next-line promise/no-nesting
      return admin.firestore().collection("users").doc(uid).set(
        userDetails
      ).then(() => {
        console.log('New Message written', userDetails)
        return userDetails
      }).catch((error) => {
        console.log('error', error);
      })
    })
    .catch((error) => {
      console.log('error:', error)
      return 'fail'
    })
}

exports.charge = functions.https.onRequest(app)
exports.addUser = functions.https.onCall(addUser)
