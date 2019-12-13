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
    try {
      const paymentIntent = await stripe.paymentIntents.create(intent)
      console.log('paymentIntent', paymentIntent)
      return paymentIntent.client_secret
    } catch (err) {
      console.log('createPaymentIntent error:', err)
      return err
    }
  })()
}

const paymentIntentSucceeded = async (request, response) => {
  let sig = request.headers["stripe-signature"]
  let event = null
  try {
    event = await stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
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
            // update payment method
            const paymentMethod = await stripe.paymentMethods.attach(
              paymentIntent.payment_method,
              {
                customer: customerId,
              }
            )
            console.log('adding order to ordrs')
            // Add order to orders
            const order = JSON.parse(paymentIntent.metadata.order)
            order.timestamp = new Date()
            order.type = 'Ad-hoc'
            await userRef.update({
              orders: admin.firestore.FieldValue.arrayUnion(order),
            })
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
            // Add order to orders
            const order = JSON.parse(paymentIntent.metadata.order)
            order.timestamp = new Date()
            order.type = 'Adh-oc'
            await userRef.update({
              orders: admin.firestore.FieldValue.arrayUnion(order),
            })
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
    try {
      const cus = await stripe.customers.create(customer)
      console.log('createdCustomer', cus)
      // Add customer to database
      const userRef = admin.firestore().collection("users").doc(cus.metadata.uid)
      await userRef.set({
        customerId: cus.id,
      }, { merge: true })
      .catch((error) => { console.log('error:', error) })
      return cus
    } catch (err) {
      console.log('creating customer error:', err)
      return err
    }
  })()
}

const createSubscription = (data, context) => {
  const { subscription } = data
  return (async () => {
    try {
      const sub = await stripe.subscriptions.create(subscription)
      console.log('createSubscription', sub)
      // Add subscription to database
      const userRef = admin.firestore().collection("users").doc(sub.metadata.uid)
      let items = []
      let total = 0
      sub.items.data.forEach(item => {
        items.push({ id: item.plan.id, title: item.plan.nickname, price: item.plan.amount, quantity: item.quantity })
        total += item.quantity * item.plan.amount
      });
      const order = {
        amount: total,
        timestamp: new Date(),
        items,
        type: 'Subscription',
      }
      await userRef.update({
        subscriptions: admin.firestore.FieldValue.arrayUnion(sub.id),
        orders: admin.firestore.FieldValue.arrayUnion(order),
      })
      return sub
    } catch (err) {
      console.log('creating sub error: ', err)
      return err
    }
  })()
}

const getSubscriptions = async (data, context) => {
  const { customerId } = data
  console.log('customerId', customerId)
  let subs = []
  // node 10 autopagination
  await stripe.subscriptions.list({ customer: customerId })
    .autoPagingEach((subscription) => {
      subs.push(subscription)
    });
  // const subs = await stripe.subscriptions.list({ customer: customerId })
  console.log('subs', subs)
  return { subs }
}

const cancelSubscription = async (data, context) => {
  const { subscriptionId } = data
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId)
    return { subscription }
  } catch (error) {
    console.log('cancelSubscription error:', error)
    error.status = 'failed'
    return { subscription: error }
  }
}

const getPaymentMethods = async (data, context) => {
  const { customerId } = data;
  let paymentMethods = [];

  await stripe.paymentMethods
    .list({ customer: customerId, type: "card" })
    .autoPagingEach(paymentMethod => {
      paymentMethods.push(paymentMethod);
    });

  return { paymentMethods };
};

const detatchPaymentMethod = async (data) => {
  const { paymentMethodId } = data;
  await stripe.paymentMethods.detach(paymentMethodId);
};

const getCustomer = async (data, context) => {
  const { customerId } = data;
  const customer = await stripe.customers.retrieve(customerId);
  return customer;
};

const deleteCustomer = async (data, context) => {
  const { customerId } = data;
  await stripe.customers.del(customerId, (err, confirmation) => {
    if (err) {
      console.log(err)
    }
    return confirmation
  });
}

exports.addUser = functions.https.onCall(addUser)
exports.createPaymentIntent = functions.https.onCall(createPaymentIntent)
exports.createSubscription = functions.https.onCall(createSubscription)
exports.getSubscriptions = functions.https.onCall(getSubscriptions)
exports.cancelSubscription = functions.https.onCall(cancelSubscription)
exports.getPaymentMethods = functions.https.onCall(getPaymentMethods)
exports.detatchPaymentMethod = functions.https.onCall(detatchPaymentMethod)
exports.createCustomer = functions.https.onCall(createCustomer)
exports.getCustomer = functions.https.onCall(getCustomer)
exports.deleteCustomer = functions.https.onCall(deleteCustomer)
exports.paymentIntentSucceeded = functions.https.onRequest(paymentIntentSucceeded)