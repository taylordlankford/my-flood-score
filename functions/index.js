/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_M0Jraaox3nxaCBqlPMEwC4pk')
const endpointSecret = 'whsec_t52NtsSu7255jYT9BnQVnui6qnkLPzMt'

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// const express = require('express');
// const cors = require('cors')({origin: true});
// const app = express();

// // TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
// const stripe = require('stripe')(functions.config().stripe.token);

// function charge(req, res) {
//     const body = JSON.parse(req.body);
//     const token = body.token.id;
//     const amount = body.charge.amount;
//     const currency = body.charge.currency;

//     // Charge card
//     stripe.charges.create({
//         amount,
//         currency,
//         description: 'Firebase Example',
//         source: token,
//     }).then(charge => {
//         return send(res, 200, {
//             message: 'Success',
//             charge,
//         });
//     }).catch(err => {
//         console.log(err);
//         send(res, 500, {
//             error: err.message,
//         });
//     });
// }


// function send(res, code, body) {
//     res.send({
//         statusCode: code,
//         headers: {'Access-Control-Allow-Origin': '*'},
//         body: JSON.stringify(body),
//     });
// }

// app.use(cors);
// app.post('/', (req, res) => {

//     // Catch any unexpected errors to prevent crashing
//     try {
//         charge(req, res);
//     } catch(e) {
//         console.log(e);
//         send(res, 500, {
//             error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
//         });
//     }
// });

const addUser = (data, context) => {
  const { uid } = context.auth
  const { userDetails } = data
  userDetails.uid = uid
  userAddress = userDetails.streetAddress1.split(', ')
  userAddress[3] = Number(userAddress[3])
  console.log('userAddress', userAddress)

  const propertiesRef = admin.firestore().collection("properties")
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

const createPaymentIntent = (data, context) => {
  const { intent } = data

  return (async () => {
    const paymentIntent = await stripe.paymentIntents.create(intent)
    console.log('paymentIntent', paymentIntent)
    return paymentIntent.client_secret
  })()
}

const paymentIntentSucceeded = (request, response) => {
  let sig = request.headers["stripe-signature"]
  let event = null
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err) {
    return response.status(400).end();
  }
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object
      console.log('PaymentIntent was successful!', paymentIntent)
      // check if user already a customer or needs to be created
      const userRef = admin.firestore().collection("users").doc(paymentIntent.metadata.uid)
      userRef.get().then( async (doc) => {
        if (doc.exists) {
          const data = doc.data()
          console.log('Document data:', data)
          const { customerId } = data
          if (customerId) { // If user is already customer
            console.log('updating customer')
            const paymentMethod = await stripe.paymentMethods.attach(
              paymentIntent.payment_method,
              {
                customer: customerId,
              }
            )
            response.json({ paymentMethod })
          } else { // If user is not already a customer
            console.log('creating customer')
            const customer = await stripe.customers.create({
              payment_method: paymentIntent.payment_method,
              invoice_settings: {
                default_payment_method: paymentMethod.id,
              },
              email: paymentIntent.metadata.email,
              metadata: paymentIntent.metadata,
            });
            console.log('created customer:', customer)
            if (!customer) { return }
            // Add customer id to firestore
            userRef.set({
              customerId: customer.id,
            }, { merge: true })
              .then((customer) => {
                response.json({ customer })
                return
              }).catch((error) => { console.log('error:', error) })
          }
          return
        } else {
          console.log("No such document! uid:", paymentIntent.metadata.uid)
          return
        }
      }).catch((error) => {
          console.log("Error getting document:", error);
      })
      break;
    }
    default:
      // Unexpected event type
      return response.status(400).end();
  }
  // Return a response to acknowledge receipt of the event
  // response.json({received: true})
}

const createCustomer = (data, context) => {
  const { customer } = data
  return (async () => {
    const cus = await stripe.customers.create(customer)
    console.log('createdCustomer', cus)
    // Add customer to database
    const userRef = admin.firestore().collection("users").doc(cus.metadata.uid)
    await userRef.set({
      customerId: cus.id,
    }, { merge: true })
    .catch((error) => { console.log('error:', error) })
    return cus
  })()
}

const createSubscription = (data, context) => {
  const { subscription } = data
  return (async () => {
    const sub = await stripe.subscriptions.create(subscription)
    console.log('createSubscription', sub)
    // Add subscription to database
    const userRef = admin.firestore().collection("users").doc(sub.metadata.uid)
    await userRef.update({
      subscriptions: admin.firestore.FieldValue.arrayUnion(sub.id),
    })
    .catch((error) => { console.log('error:', error) })
    return sub
  })()
}

exports.addUser = functions.https.onCall(addUser)
exports.createPaymentIntent = functions.https.onCall(createPaymentIntent)
exports.createSubscription = functions.https.onCall(createSubscription)
exports.createCustomer = functions.https.onCall(createCustomer)
exports.paymentIntentSucceeded = functions.https.onRequest(paymentIntentSucceeded)
