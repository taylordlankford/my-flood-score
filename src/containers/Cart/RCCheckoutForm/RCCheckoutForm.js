import React, { useContext, useEffect, useState } from "react";
import { injectStripe } from "react-stripe-elements";
import * as ROUTES from "../../../routes/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutContext } from "../CheckoutContext";
import useReactRouter from "use-react-router";

import {
  Title,
  LinkSecondary,
  TransitionBtn
} from "../../../StyledComponents/StyledComponents";
import { pushInfo } from "../../../redux/actions/notificationActions";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex
} from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import "./RCCheckoutform.css"

import NewCardFormModal from "./NewCardFormModal";
import OrderDetails from "./OrderDetails";
import { setPaymentProcessing } from "../../../redux/actions/cartActions";

const RCCheckoutForm = props => {
  const { history } = useReactRouter();
  const cart = useSelector(state => state.cartReducer);
  const { firestoreUser, firebase } = useContext(CheckoutContext);
  const { email, uid } = firestoreUser;
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showRadioForm, setShowRadioForm] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedPaymentMethod, setSelectPaymentMethod] = useState("");
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState(null)

  useEffect(() => {
    fetchData(); // Fetch Customer & Customer's Payment Methods
    dispatch(setPaymentProcessing(false));
  }, [processing, showNewCardForm]);

  const fetchData = async () => {
    if (typeof firestoreUser.customerId !== "undefined") {
      // Set Customer
      firebase
        .doGetCustomer(firestoreUser.customerId)
        .then(customerData => {
          console.log("customer: ", customerData);
          setCustomer(customerData.data);
        })
        .then(() => {
          // Set Payment Methods
          firebase
            .doGetPaymentMethods(firestoreUser.customerId)
            .then(paymentMethodsData => {
              console.log("payment methods: ", paymentMethodsData.data.paymentMethods);
              setPaymentMethods(paymentMethodsData.data.paymentMethods);
            });
        });
    }
  };

  // Update default payment method (update default)
  // const attachPaymentMethod = (e, pmId, customerId) => {
  //   e.preventDefault();
  //   setProcessing(true);
  //   // Attach a new payment method to Stripe customer through Stripe API
  //   firebase.doAttachPaymentMethod(pmId, customerId).then(() => {
  //     // Update the customer with the new default payment method
  //     firebase.doUpdateCustomerDefaultPaymentMethod(customer, pmId).then(() => {
  //       // refresh the page with new state from Stripe API
  //       fetchData();
  //       setProcessing(false);
  //       dispatch(pushInfo(`Successfully attached payment method.`));
  //     });
  //   });
  // };

  // Detach payment method (delete)
  // const detachPaymentMethod = (e, pmId) => {
  //   e.preventDefault();
  //   firebase.doDetachPaymentMethod(pmId).then(() => {
  //     setProcessing(true);
  //     console.log("Payment Method detached successfully.");
  //     dispatch(pushInfo(`Successfully detached payment method.`));
  //   });
  //   setProcessing(false);
  // };

  // Render correct icon for card type
  const renderCardIcon = cardType => {
    switch (cardType) {
      case "visa": {
        return (<><FaCcVisa size={30} /> Ending{" "}</>);
      }
      case "mastercard": {
        return (<><FaCcMastercard size={30} /> Ending{" "}</>);
      }
      case "discover": {
        return (<><FaCcDiscover size={30} /> Ending{" "}</>);
      }
      case "amex": {
        return (<><FaCcAmex size={30} /> Ending{" "}</>);
      }
      default: {
        return cardType;
      }
    }
  };
  
  // Disable the place order button if no card has been selected
  const isInvalid =
    chosenPaymentMethod == null || typeof chosenPaymentMethod == "undefined";

  // Place the order
  const placeOrder = async e => {
    e.preventDefault();
    dispatch(setPaymentProcessing(true));

    // Create the Order, Sub items and Intent Amount
    console.log("Cart Added Items => ", cart.addedItems);
    let subItems = [];
    let intentAmount = 0;
    const order = { items: [] };
    cart.addedItems.forEach(item => {
      console.log("ITEM -> ", item);
      const { id, title, price, plan, quantity, categoryId, numInventory } = item;

      if (item.type === "monthly") {
        subItems.push({ plan, quantity, metadata: { categoryId, numInventory } });
      } else {
        order.items.push({ id, title, price, quantity, categoryId, numInventory });
        intentAmount += item.price * item.quantity;
      }
    });

    // Subscription uses the customer's default payment method
    let customerId = customer.id;
    let defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

    // Create subscription if necessary
    console.log("PM -> ", defaultPaymentMethodId);
    console.log("customer -> ", customerId);
    if (subItems.length > 0) {
      console.log("creating sub for items:", subItems);
      const subscription = await firebase.doCreateSubscription({
        customer: customerId,
        default_payment_method: defaultPaymentMethodId,
        items: subItems,
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          email,
          uid,
          type: "subscription",
          subItems: JSON.stringify(subItems)
        }
      });

      console.log("Subscription -> ", subscription);

      if (typeof subscription.data.raw !== "undefined") {
        console.log(subscription.data.statusCode);
        setErrorMessage("Error: " + subscription.data.raw.message);
        dispatch(setPaymentProcessing(false));
        return;
      }
    }

    // Create Payment intent if necessary
    if (intentAmount > 0) {
      console.log("creating intent for amount of:", intentAmount);
      order.amount = intentAmount;
      console.log("order is equal to --> ", order);
      const intent = await firebase.doCreatePaymentIntent({
        customer: customer.id,
        payment_method: chosenPaymentMethod.id,
        amount: intentAmount,
        currency: "usd",
        setup_future_usage: "off_session",
        receipt_email: email,
        description: "My Flood Score",
        metadata: {
          email,
          uid,
          order: JSON.stringify(order),
          type: "ad-hoc"
        }
      });

      console.log("Intent obj -> ", intent);

      if (typeof intent.data.raw !== "undefined") {
        console.log(intent.data.statusCode);
        setErrorMessage("Error: " + intent.data.raw.message);
        dispatch(setPaymentProcessing(false));
        return;
      }

      const client_secret = intent.data;
      // Use client_secret to confirm card payment
      console.log("confirming card payment with CS:", client_secret);

      console.log("Customer: ", customer);
      console.log("Customer default payment method: ", defaultPaymentMethodId);

      // Use the default payment method instead of card element
      const result = await props.stripe.confirmCardPayment(client_secret, {
        payment_method: chosenPaymentMethod.id
        // payment_method: {card: cardElement},
        // setup_future_usage: 'off_session'
      });

      if (result.error) {
        // Show error to your customer
        console.log("confirmCardPayment", result.error.message);
        setErrorMessage("Error: " + result.error.message);
        dispatch(setPaymentProcessing(false));
        return;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("confirmCardPayment success, result:", result);
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback execution
          // Set up a webhook or plugin to listen for the payment_intent.succeeded event
          // to save the card to a Customer
        }
      }
    } // EOF Create Payment Intent

    // Clean up
    dispatch(setPaymentProcessing(false));
    history.push(ROUTES.ACCOUNT_INVENTORY);
  }; // EOF placeOrder()

  const handleOptionChange = (e, paymentMethod) => {
    console.log("Youve selected: ", e.target.value);
    setSelectPaymentMethod(paymentMethod.id)
    console.log(selectedPaymentMethod)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Youve submitted, ', selectedPaymentMethod)
    paymentMethods.map((paymentMethod) => {
      if (paymentMethod.id === selectedPaymentMethod) {
        console.log('Youve selected: ', paymentMethod)
        setChosenPaymentMethod(paymentMethod)
        setShowRadioForm(false)
        dispatch(pushInfo(`You've added ${paymentMethod.card.brand} ending in ${paymentMethod.card.last4}.`))
      }
    })
  }

  return (
    <>
      <NewCardFormModal
        customer={customer}
        show={showNewCardForm}
        setProcessing={() => setProcessing()}
        setShowNewCardForm={() => setShowNewCardForm()}
        onHide={() => setShowNewCardForm(false)}
      />

      <Row sm={12}>
        {showRadioForm ? (
          <Col sm={6}>
            <Row sm={12}>
              <Col sm={10} style={{ paddingBottom: "20px" }}>
                <Title>Choose a Payment Method</Title>
              </Col>
              <Col sm={2} style={{ textAlign: "right" }}>
                <LinkSecondary onClick={() => setShowRadioForm(false)}>
                  Close
                </LinkSecondary>
              </Col>
            </Row>
            <Row sm={12}>
              {/* Radio Form */}
              <Form onSubmit={e => handleFormSubmit(e)}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Your credit and debit cards</th>
                      <th>Expiration Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentMethods.map((paymentMethod, idx) => (
                      <tr key={idx}>
                        <td>
                          <label className="radio-container">
                            <input
                              type="radio"
                              name="paymentMethod"
                              id={idx}
                              value={paymentMethod.id}
                              checked={
                                selectedPaymentMethod === paymentMethod.id
                              }
                              onChange={e =>
                                handleOptionChange(e, paymentMethod)
                              }
                              style={{ marginRight: "20px" }}
                            />
                            <span className="checkmark"></span>
                            {renderCardIcon(paymentMethod.card.brand)} in{" "}
                            {paymentMethod.card.last4}{" "}
                          </label>
                        </td>
                        <td>
                          {paymentMethod.card.exp_month +
                            " / " +
                            paymentMethod.card.exp_year}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div style={{ paddingTop: "20px" }}>
                  <LinkSecondary onClick={() => setShowNewCardForm(true)}>
                    Add a credit or debit card
                  </LinkSecondary>
                  <span style={{ fontSize: "14px" }}>
                    {" - "}MyFloodScore accepts all major credit cards.
                  </span>
                </div>
                <Row sm={12} style={{ paddingTop: "40px" }}>
                  <Col sm={7}>
                    <TransitionBtn>Use this payment method</TransitionBtn>
                  </Col>
                  <Col sm={5}></Col>
                </Row>
              </Form>
              {/* EOF Radio Form */}
            </Row>
          </Col>
        ) : (
          <Col sm={6}>
            <Row sm={12}>
              <Col sm={10} style={{ paddingBottom: "20px" }}>
                <Title>Your Payment Methods</Title>
              </Col>
              <Col sm={2} style={{ textAlign: "right" }}>
                <LinkSecondary onClick={() => setShowRadioForm(true)}>
                  Change
                </LinkSecondary>
                <Button></Button>
              </Col>
            </Row>
            {chosenPaymentMethod != null ? (
              <Row sm={12}>
                {console.log(chosenPaymentMethod)}
                <Col sm={6} style={{ textAlign: "left" }}>
                  {renderCardIcon(chosenPaymentMethod.card.brand)} in{" "}
                  {chosenPaymentMethod.card.last4}{" "}
                </Col>
                <Col sm={6} style={{ textAlign: "right" }}>
                  {chosenPaymentMethod.card.exp_month +
                    " / " +
                    chosenPaymentMethod.card.exp_year}
                </Col>
              </Row>
            ) : (
              <>
                <LinkSecondary onClick={() => setShowRadioForm(true)}>
                  Select
                </LinkSecondary>
                <span> your payment method first.</span>
              </>
            )}
          </Col>
        )}
        {/* Order Deetails */}
        <OrderDetails
          cart={cart}
          placeOrder={placeOrder}
          isInvalid={isInvalid}
        />
      </Row>
    </>
  );
};

export default injectStripe(RCCheckoutForm);
