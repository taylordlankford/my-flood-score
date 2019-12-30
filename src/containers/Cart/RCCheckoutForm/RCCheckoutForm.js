import React, { useContext, useEffect, useState } from "react";
import { injectStripe } from "react-stripe-elements";
import * as ROUTES from "../../../routes/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutContext } from "../CheckoutContext";
import useReactRouter from "use-react-router";

import {
  Title,
  LinkSecondary,
  TransitionBtn,
  SubscriptionNotice
} from "../../../StyledComponents/StyledComponents";
import { pushInfo } from "../../../redux/actions/notificationActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import "./RCCheckoutform.css";

import NewCardFormModal from "./NewCardFormModal";
import OrderDetails from "./OrderDetails";
import { setPaymentProcessing, resetCart } from "../../../redux/actions/cartActions";
import { renderCardIcon } from "./renderCardIcon";

const RCCheckoutForm = props => {
  const { history } = useReactRouter();
  const cart = useSelector(state => state.cartReducer);
  const { firestoreUser, firebase } = useContext(CheckoutContext);
  const { email, uid } = firestoreUser;
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  // const [showRadioForm, setShowRadioForm] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedPaymentMethod, setSelectPaymentMethod] = useState("");
  const [chosenPaymentMethod, setChosenPaymentMethod] = useState(null);

  useEffect(() => {
    fetchData();
    dispatch(setPaymentProcessing(false));
  }, [processing, showNewCardForm]);

  // Fetch Customer & Customer's Payment Methods
  const fetchData = async () => {
    if (typeof firestoreUser.customerId !== "undefined") {
      firebase
        .doGetCustomer(firestoreUser.customerId)
        .then(customerData => {
          setCustomer(customerData.data);
        })
        .then(() => {
          firebase
            .doGetPaymentMethods(firestoreUser.customerId)
            .then(paymentMethodsData => {
              setPaymentMethods(paymentMethodsData.data.paymentMethods);
            });
        });
    }
  };

  /**
   *  Place order is triggered from OrderDetails component.
   */
  const placeOrder = async e => {
    setProcessing(true);
    e.preventDefault();
    dispatch(setPaymentProcessing(true));
    // const { email, uid } = firestoreUser;
    let { customerId } = firestoreUser;

    /**
     * If customer does not exist, create the customer and set a
     * default_payment_method for the customer. Subscriptions will require the
     * customer's invoice_settings default_payment_method to be set.
     */
    if (!customerId) {
      const customer = await firebase.doCreateCustomer({
        email,
        payment_method: selectedPaymentMethod,
        invoice_settings: {
          default_payment_method: selectedPaymentMethod
        },
        metadata: {
          email,
          uid
        }
      });

      if (typeof customer.data.raw !== "undefined") {
        setErrorMessage("Error: " + customer.data.raw.message);
        dispatch(setPaymentProcessing(false));
        return;
      }
      customerId = customer.data.id;
    } else {
      console.log("customer already exists");
    }

    // Create the Order, Sub items and Intent Amount
    let subItems = [];
    let intentAmount = 0;
    const order = { items: [] };
    cart.addedItems.forEach(item => {
      const {
        id,
        title,
        price,
        plan,
        quantity,
        categoryId,
        numInventory
      } = item;

      if (item.type === "monthly") {
        subItems.push({
          plan,
          quantity,
          metadata: { categoryId, numInventory }
        });
      } else if (item.type === "single") {
        order.items.push({
          id,
          title,
          price,
          quantity,
          categoryId,
          numInventory
        });
        // intentAmount += item.price
        intentAmount += item.price * item.quantity;
      }
    });

    // let defaultPaymentMethodId = customer.invoice_settings.default_payment_method;

    /**
     * default_payment_method (optional)
     * ID of the default payment method for the subscription. It must belong to
     * the customer associated with the subscription. If not set, invoices will
     * use the default payment method in the customer’s invoice settings.
     *
     * We won't set the default payment method. Let it always fall back on the
     * customer's invoice setting's default payment method.
     *
     * When the customer changes their default payment method. We don't want
     * them to have to keep track of which subscription belongs to which cards.
     * Keep it null so subscriptions defaults to one card a.k.a the customer's
     * invoice_setting's default_payment_method.
     *
     * Create subscription if necessary
     */
    if (subItems.length > 0) {
      const subscription = await firebase.doCreateSubscription({
        customer: customerId,
        // default_payment_method: defaultPaymentMethodId,
        items: subItems,
        expand: ["latest_invoice.payment_intent"],
        metadata: {
          email,
          uid,
          type: "subscription",
          subItems: JSON.stringify(subItems)
        }
      });

      if (typeof subscription.data.raw !== "undefined") {
        // console.log(subscription.data.statusCode);
        setErrorMessage("Error: " + subscription.data.raw.message);
        dispatch(setPaymentProcessing(false));
        return;
      }
    }

    /**
     * Create Payment Intent if necessary with the selected card.
     * Use the selected payment method from checkout.
     */
    if (intentAmount > 0) {
      order.amount = intentAmount;
      const intent = await firebase.doCreatePaymentIntent({
        customer: customer.id,
        payment_method: selectedPaymentMethod,
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

      // console.log("Intent obj -> ", intent);

      if (typeof intent.data.raw !== "undefined") {
        // console.log(intent.data.statusCode);
        setErrorMessage("Error: " + intent.data.raw.message);
        dispatch(setPaymentProcessing(false));
        return;
      }

      // Use client_secret to confirm card payment
      const client_secret = intent.data;

      /**
       * Use the selected payment method from customer instead of the card
       * fetched from stripe.
       */

      const result = await props.stripe.confirmCardPayment(client_secret, {
        payment_method: selectedPaymentMethod
        // payment_method: chosenPaymentMethod.id
        // payment_method: {card: cardElement},
        // setup_future_usage: 'off_session'
      });

      if (result.error) {
        // Show error to your customer
        setErrorMessage("Error: " + result.error.message);
        dispatch(setPaymentProcessing(false));
        return;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          // console.log("confirmCardPayment success, result:", result);
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback execution
          // Set up a webhook or plugin to listen for the payment_intent.succeeded event
          // to save the card to a Customer
        }
      }
    } // EOF Create Payment Intent

    // Clean up
    dispatch(setPaymentProcessing(false));
    setProcessing(false);
    dispatch(resetCart())
    history.push(ROUTES.ACCOUNT_INVENTORY);
  };
  // EOF placeOrder()

  const handleOptionChange = (e, paymentMethod) => {
    setSelectPaymentMethod(paymentMethod.id);
  };

  /**
   * Handles selecting the card to be used for the Payment Intent.
   */
  const handleFormSubmit = e => {
    e.preventDefault();
    paymentMethods.map(paymentMethod => {
      if (paymentMethod.id === selectedPaymentMethod) {
        setChosenPaymentMethod(paymentMethod);
        // setShowRadioForm(false);
        dispatch(
          pushInfo(
            `You've selected ${paymentMethod.card.brand} ending in ${paymentMethod.card.last4}.`
          )
        );
      }
    });
  };

  // Disable the place order button if no card has been selected
  const isInvalid = chosenPaymentMethod == null || typeof chosenPaymentMethod == "undefined";

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
        <Col sm={6}>
          <Row sm={12}>
            <Col sm={10} style={{ paddingBottom: "20px" }}>
              <Title>Choose a Payment Method</Title>
              <SubscriptionNotice>
                * Subscriptions will be charged to your default payment method.
              </SubscriptionNotice>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}></Col>
          </Row>
          <Row sm={12}>
            <p className="errorMessage">{errorMessage}</p>
            <Form onSubmit={e => handleFormSubmit(e)}>
              <Table hover>
                <thead>
                  <tr>
                    <th>Your credit and debit cards</th>
                    <th>Expiration Date</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentMethods.map((paymentMethod, idx) =>
                    paymentMethod.id ===
                    customer.invoice_settings.default_payment_method ? (
                      <tr key={idx}>
                        <td>
                          <label className="radio-container">
                            <input
                              type="radio"
                              name="paymentMethod"
                              id={idx}
                              value={paymentMethod.id}
                              checked={selectedPaymentMethod === paymentMethod.id}
                              onChange={e => handleOptionChange(e, paymentMethod)}
                              style={{ marginRight: "20px" }}
                            />
                            <span className="checkmark"></span>
                            {renderCardIcon(paymentMethod.card.brand)} in{" "}
                            {paymentMethod.card.last4}{" "}
                            <Badge
                              style={{
                                backgroundColor: "#0D238E",
                                color: "#ffffff"
                              }}
                            >
                              DEFAULT
                            </Badge>
                          </label>
                        </td>
                        <td>
                          {paymentMethod.card.exp_month + " / " + paymentMethod.card.exp_year}
                        </td>
                      </tr>
                    ) : (
                      <tr key={idx}>
                        <td>
                          <label className="radio-container">
                            <input
                              disabled={processing}
                              type="radio"
                              name="paymentMethod"
                              id={idx}
                              value={paymentMethod.id}
                              checked={selectedPaymentMethod === paymentMethod.id}
                              onChange={e => handleOptionChange(e, paymentMethod) }
                              style={{ marginRight: "20px" }}
                            />
                            <span className="checkmark"></span>
                            {renderCardIcon(paymentMethod.card.brand)} in{" "}
                            {paymentMethod.card.last4}{" "}
                          </label>
                        </td>
                        <td>
                          {paymentMethod.card.exp_month + " / " + paymentMethod.card.exp_year}
                        </td>
                      </tr>
                    )
                  )}
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
          </Row>
        </Col>
        {/* Order Deetails */}
        <OrderDetails
          cart={cart}
          placeOrder={placeOrder}
          isInvalid={isInvalid}
          processing={processing}
        />
      </Row>
    </>
  );
};

export default injectStripe(RCCheckoutForm);
