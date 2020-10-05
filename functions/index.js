/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions')
const stripe = require('stripe')('sk_test_M0Jraaox3nxaCBqlPMEwC4pk')
const endpointSecret = 'whsec_t52NtsSu7255jYT9BnQVnui6qnkLPzMt'

require('dotenv').config()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// const express = require('express');
const cors = require('cors')({origin: true});
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

// Helper functions
const getNewInventory = (inventory, order) => {
  for (let i = 0; i < order.items.length; i++) {
    const orderedItem = order.items[i]
    let quantAdded = false
    for (let j = 0; j < inventory.length; j++) {
      const inven = inventory[j]
      if (orderedItem.categoryId === inven.categoryId) {
        inventory[j].quantity = inven.quantity + (orderedItem.quantity * orderedItem.numInventory)
        quantAdded = true
        break
      }
    }
    if (!quantAdded) {
      inventory.push({
        categoryId: orderedItem.categoryId,
        quantity: orderedItem.quantity * orderedItem.numInventory
      })
    }
  }
  return inventory
}


const addUser = (data, context) => {
  const { uid } = context.auth
  const { userDetails } = data
  userDetails.uid = uid
  const { streetAddress1, county } = userDetails

  const propertiesRef = admin.firestore()
    .collection("properties").doc('Florida')
    .collection('counties').doc(county)
    .collection('properties')
  const properties = propertiesRef.where("FULL_ADD", "==", streetAddress1)
  return properties.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userDetails.propertyRef = propertiesRef.doc(doc.id)
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
      const { paymentMethod } = paymentIntent
      if (paymentIntent.invoice !== null) {
        console.log('this is a subscription, we have a seperate hook for these')
        return
      }
      // check if user already a customer or needs to be created
      const userRef = admin.firestore().collection("users").doc(paymentIntent.metadata.uid)
      userRef.get().then(async (doc) => {
        if (doc.exists) {
          const data = doc.data()
          console.log('Document data:', data)
          const { customerId } = data
          if (customerId) { // If user is already customer
            console.log('updating customer')
            // update payment method
            try { // this will catch if customer is using a saved card
              await stripe.paymentMethods.attach(
                paymentIntent.payment_method,
                {
                  customer: customerId,
                }
              )
            } catch (error) {
              console.log('customer probably using saved card.')
              console.log(error)
            }
            console.log('adding order to ordrs')
            // Add order to orders
            const order = JSON.parse(paymentIntent.metadata.order)
            order.timestamp = new Date()
            order.type = 'Ad-hoc'
            // Add items to inventory
            let { inventory } = data
            if (typeof inventory === 'undefined') { inventory = [] }
            console.log('inventory', inventory)
            const newInventory = getNewInventory(inventory, order)
            await userRef.update({
              orders: admin.firestore.FieldValue.arrayUnion(order),
              inventory: newInventory,
            })
            response.json({ paymentIntent })
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
            // Add items to inventory
            let { inventory } = data
            if (typeof inventory === 'undefined') { inventory = [] }
            console.log('inventory', inventory)
            const newInventory = getNewInventory(inventory, order)
            await userRef.update({
              orders: admin.firestore.FieldValue.arrayUnion(order),
              inventory: newInventory,
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

const invoicePaymentSucceeded = async (request, response) => {
  console.log('process.version', process.version)
  let sig = request.headers["stripe-signature"]
  const invoiceEndpointSecret = 'whsec_M0YTl00hKCmcfOTcP08XRldrtuTcxqGk'
  let event = null
  try {
    event = await stripe.webhooks.constructEvent(request.rawBody, sig, invoiceEndpointSecret);
  } catch (err) {
    console.log('error', err)
    return response.status(400).end();
  }
  const invoice = event.data.object
  console.log('invoice', invoice)
  switch (event.type) {
    case 'invoice.payment_succeeded': {
      console.log('invoice payment succeeded')
      const array = JSON.parse(invoice.lines.data[0].metadata.subItems)
      const order = {}
      order.items = []
      array.forEach(el => {
        const newObj = {
          plan: el.plan,
          quantity: el.quantity,
          categoryId: el.metadata.categoryId,
          numInventory: el.metadata.numInventory,
        }
        order.items.push(newObj)
      })
      console.log('order:', order)
      const { uid } = invoice.lines.data[0].metadata
      console.log('uid', uid)
      const userRef = admin.firestore().collection("users").doc(uid)
      userRef.get().then(async (doc) => {
        if (doc.exists) {
          const data = doc.data()
          console.log('Document data:', data)
          let { inventory } = data
          if (typeof inventory === 'undefined') { inventory = [] }
          const newInventory = getNewInventory(inventory, order)
          await userRef.update({
            inventory: newInventory,
          })
          response.status(200).end();
          return newInventory
        } else {
          return 'doc not found'
        }
      })
        .catch((error => {
          console.log('userReg.get error', error)
        }))
      break
    }
    case 'invoice.payment_failed': {
      console.log('payment_failed')
      break
    }
    case 'invoice.payment_action_required': {
      console.log('payment_action_required')
      break
    }
    default:
      return response.status(400).end();
  }
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

const updateCustomerDefaultPaymentMethod = data => {
  const { customer, paymentMethodId } = data;
  console.log("customer: ", customer);
  console.log("pm id: ", paymentMethodId);
  stripe.customers.update(
    customer.id,
    { invoice_settings: { default_payment_method: paymentMethodId } },
    (err, customer) => {
      // asynchronously called
      if (err) {
        console.log(err);
      }
      return { customer };
    }
  );
};

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

/*** Payment Method API ***/
const getPaymentMethod = async data => {
  const { paymentMethodId } = data;
  let paymentMethod = null
  await stripe.paymentMethods.retrieve(paymentMethodId).then(pm => {
    paymentMethod = pm;
    return { paymentMethod };
  })

  return { paymentMethod };
};

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

const attachPaymentMethod = async data => {
  const { paymentMethodId, customerId } = data;
  console.log("pm id: ", paymentMethodId);
  console.log("customer id: ", customerId);
  await stripe.paymentMethods.attach(
    paymentMethodId,
    { customer: customerId },
    (err, paymentMethod) => {
      if (err) {
        console.log(err);
      }
      return paymentMethod;
    }
  );
};

const detatchPaymentMethod = async (data) => {
  const { paymentMethodId } = data;
  await stripe.paymentMethods.detach(paymentMethodId);
};
/*** EOF Payment Method API ***/

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

/**
 * Email notifcation for new screening data.
 */
const sendEmailNotification = async () => {
  console.log('Send email notifcation function triggered.')

  // eslint-disable-next-line promise/catch-or-return
  admin.firestore().collection('nffUsersEmails').add({
    to: 'kowitkarunas@gmail.com',
    message: {
      subject: 'Hello from Firebase!',
      text: 'This is the plaintext section of the email body.',
      html: 'This is the <code>HTML</code> section of the email body.',
  }
  }).then(() => console.log('Queued email for delivery!'));
}

/*
const sendEmailNotification = async (nffUser) => {
  const { name, email, phone } = nffUser
  const htmlBody = `
  <html>
    <div class="global-wrapper">
      <div class="header">
        <h1>NoFloodFlorida</h1>
      </div>
      <div class="body">
        <div>
          <h3>New nff screening entry</h3>
        </div>
        <div>
          <strong>name: </strong>${name}
        </div>
        <div>
          <strong>email: </strong>${email}
        </div>
        <div>
          <strong>phone: </strong>${phone}
        </div>
      </div>
    </div>

    <style>
      .global-wrapper {
      }

      .header {
        margin: 0 auto;
        width: 100%;
        padding: 20px;
      }

      .body {
        margin: 0 auto;
        width: 100%; 
        height: 100%;
        padding: 20px;
      }
    </style>
  </html>
  `

  const API_KEY = process.env.API_KEY
  const SENDER_EMAIL = process.env.SENDER_EMAIL
  const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL
  const DOMAIN = process.env.DOMAIN
  const mailgun = require("mailgun-js");
  const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });
  const data = {
    from: SENDER_EMAIL,
    to: RECEIVER_EMAIL,
    subject: 'New screening submission entry.',
    text: 'New screening submission entry.',
    html: htmlBody,
  };

  mg.messages().send(data, (error, body) => {
    console.log(body);
  });
}
*/


const getProperty = (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(500).json({
        message: 'No Allowed'
      })
    }
    const { state, county, zip, streetAddress, apiKey, fields } = req.query
    if (!apiKey) {
      res.status(400).json({
        error: 'apiKey is required',
      })
    }
    // Check if apiKey valid
    apiUserRef = admin.firestore().collection('apiUsers')
    const apiKeyQuerySnapshot = await apiUserRef.where("apiKey", "==", apiKey).get()
    const results = []
    apiKeyQuerySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const data = doc.data()
      data.doc = doc
      results.push(data)
    })
    // If no apiUser found reject
    if (results.length === 0) {
      return res.status(401).json({
        error: 'Unauthorized',
      })
    }
    const apiUser = results[0]
    const { monthLimit, monthCount } = apiUser
    const dateObj = new Date()
    if (monthCount && monthCount[dateObj.getFullYear()][dateObj.getMonth()+1] >= monthLimit) {
      return res.status(403).json({
        error: 'Monthly usage limit has been met',
      })
    }
    if (!state) {
      res.status(400).json({
        error: 'state is required'
      })
    }
    if (!county) {
      res.status(400).json({
        error: 'county is required',
      })
    }
    if (!zip) {
      res.status(400).json({
        error: 'zip is required',
      })
    }
    if (!streetAddress) {
      res.status(400).json({
        error: 'streetAddress is required',
      })
    }
    try {
      const propertiesRef = admin.firestore()
        .collection("properties").doc(state)
        .collection('counties').doc(county)
        .collection('properties')
      let querySnapshot
      querySnapshot = await propertiesRef.where("PROP_ZIP", "==", zip).where("PROP_ADD", "==", streetAddress).get()
      const properties = []
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          if (fields) {
            const data = doc.data()
            const fieldsArray = fields.split(',')
            const newObj = {}
            fieldsArray.forEach(field => {
              newObj[field] = data[field]
            })
            properties.push(newObj)
          } else {
            properties.push(doc.data())
          }
      });
      if (properties.length === 0) {
        // check if county exists
        const countiesQuerySnapshot = await admin.firestore().collection("properties").doc(state).collection('counties').get()
        const countyNames = []
        countiesQuerySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          countyNames.push(doc.id)
        })
        if (countyNames.includes(county)) {
          res.status(400).json({
            error: 'County found but could not find property with given zip code and address.',
          })
        } else {
          res.status(400).json({
            error: 'County not found. Available counties available in countyNames prop',
            countyNames: countyNames,
          })
        }
      } else {
        res.status(200).json({
          properties,
        })
      }
      apiUser.doc.ref.update({
        [`monthCount.${dateObj.getFullYear()}.${dateObj.getMonth()+1}`]: admin.firestore.FieldValue.increment(1)
      })
      apiUser.doc.ref.collection('requests').add({
        endpoint: 'getProperty',
        request: req.query,
        date: new Date(),
      })
      return 'Done'
    } catch (error) {
      console.log('error getting document:', error)
      return res.status(400).json({
        error,
      })
    }
  })
}


/**
 * Exports
 */
exports.sendEmailNotification              = functions.https.onCall(sendEmailNotification)
exports.addUser                            = functions.https.onCall(addUser)
exports.createPaymentIntent                = functions.https.onCall(createPaymentIntent)
exports.createSubscription                 = functions.https.onCall(createSubscription)
exports.getSubscriptions                   = functions.https.onCall(getSubscriptions)
exports.cancelSubscription                 = functions.https.onCall(cancelSubscription)
exports.getPaymentMethod                   = functions.https.onCall(getPaymentMethod)
exports.getPaymentMethods                  = functions.https.onCall(getPaymentMethods)
exports.attachPaymentMethod                = functions.https.onCall(attachPaymentMethod)
exports.detatchPaymentMethod               = functions.https.onCall(detatchPaymentMethod)
exports.createCustomer                     = functions.https.onCall(createCustomer)
exports.getCustomer                        = functions.https.onCall(getCustomer)
exports.deleteCustomer                     = functions.https.onCall(deleteCustomer)
exports.updateCustomerDefaultPaymentMethod = functions.https.onCall(updateCustomerDefaultPaymentMethod)
exports.paymentIntentSucceeded             = functions.https.onRequest(paymentIntentSucceeded)
exports.invoicePaymentSucceeded            = functions.https.onRequest(invoicePaymentSucceeded)
exports.getProperty                        = functions.https.onRequest(getProperty)
