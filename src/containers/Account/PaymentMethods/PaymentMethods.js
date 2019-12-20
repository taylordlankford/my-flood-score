import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountContext } from "../AccountContext";

// Styles
import {
  Container,
  Title,
  LinkSecondary,
  SubscriptionNotice
} from "../../../StyledComponents/StyledComponents";
import { pushInfo } from "../../../redux/actions/notificationActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PaymentMethods.css";

// Components
// import IsLoading from "./IsLoading";
import Loading from "../../../components/Loading/Loading"
import PaymentMethodsList from "./PaymentMethodsList";
import Notification from "../../../components/Notifications/Notification";
import NewCardFormModal from "./NewCardFormModal";
import ChangeDefaultPaymentMethodWarning from "./ChangeDefaultPaymentMethodWarning";
import DeleteDefaultPaymentMethodWarning from "./DeleteDefaultPaymentMethodWarning";

const PaymentMethods = () => {
  // Data
  const { firebase, firestoreUser } = useContext(AccountContext);
  const dispatch                    = useDispatch();

  // States
  const [customer, setCustomer]                         = useState(null);
  const [paymentMethods, setPaymentMethods]             = useState([]);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);

  const [showNewCardForm, setShowNewCardForm]     = useState(null);
  const [processing, setProcessing]               = useState(false);
  const [isFetchingData, setIsFetchingData]       = useState(false);
  const [showWarning, setShowWarning]             = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [hasSubscriptions, setHasSubscriptions]   = useState(false);

  /**
   * Trigger useEffect() hook everytime it detects a change from state that
   * tracks processing. We want to keep the table updated live with response
   * from Stripe.
   */
  useEffect(() => {
    fetchData();
  }, [processing, isFetchingData]);

  /**
   * Fetch data from Stripe API,
   * Set states for,
   *    customer
   *    default payment method,
   *    list of payment methods
   */
  const fetchData = async () => {
    let defaultPmId = "";
    if (typeof firestoreUser.customerId !== "undefined") {
      setIsFetchingData(true);
      firebase
        .doGetCustomer(firestoreUser.customerId)
        .then(customerData => {
          setCustomer(customerData.data);
          defaultPmId = customerData.data.invoice_settings.default_payment_method
          firebase.doGetPaymentMethod(defaultPmId).then(defaultPm => {
            setDefaultPaymentMethod(defaultPm.data.paymentMethod)
          })
        })
        .then(() => {
          firebase
            .doGetPaymentMethods(firestoreUser.customerId)
            .then(paymentMethodsData => {
              setPaymentMethods(paymentMethodsData.data.paymentMethods);
            });
        })
    }
    setIsFetchingData(false);
  };

  /**
   * Fetch the default payment method. Requires default payment method id.
   */
  const fetchDefaultPaymentMethod = (defaultPaymentMethodId) => {
    firebase.doGetPaymentMethod(defaultPaymentMethodId).then(data => {
      setDefaultPaymentMethod(data.data.paymentMethod)
    })
  }

  /**
   * Attach Default Payment Method to Customer
   *
   * Function to update the customer's default payment method with a new
   * payment method from their list of payment methods.
   *
   * First, attach the payment method to the customer, then update the
   * invoice_setting's default_payment_method.
   */
  const attachDefaultPaymentMethod = (e, pmId, customerId) => {
    e.preventDefault();
    setProcessing(true);
    firebase.doAttachPaymentMethod(pmId, customerId).then(() => {
      firebase.doUpdateCustomerDefaultPaymentMethod(customer, pmId).then(() => {
        fetchData();
        setShowWarning(false);
        setProcessing(false);
        // setDefaultPaymentMethod(defaultPaymentMethod);
        dispatch(
          pushInfo(
            `${defaultPaymentMethod.card.brand} ending in ${defaultPaymentMethod.card.last4} is your new default payment method.`
          )
        );
      });
    });
  };

  /**
   * Detach Payment Method from Customer
   *
   * Before detaching the payment method from the customer, check if the
   * payment method is the same as customer's invoice setting's default payment
   * method.
   *
   * If it's true, check if the default payment method has subscriptions. If true,
   * show warning.
   *
   * If customer has no subscriptions, just detach the default payment method.
   *
   * If it is a non-default payment method, just detach the card.
   */
  const detachPaymentMethod = (e, pm, customer) => {
    e.preventDefault();

    if (pm.id === customer.invoice_settings.default_payment_method) {
      if (customer.subscriptions.data.length > 0) {
        console.log("There are subscriptions");
        setHasSubscriptions(true);
        setShowDeleteWarning(true);
      } else {
        firebase.doDetachPaymentMethod(pm.id).then(() => {
          setProcessing(true);
          console.log("Payment Method detached successfully.");
          dispatch(pushInfo(`Successfully removed payment method.`));
          setProcessing(false);
        });
      }
    } else {
      firebase.doDetachPaymentMethod(pm.id).then(() => {
        setProcessing(true);
        console.log("Payment Method detached successfully.");
        dispatch(pushInfo(`Successfully removed payment method.`));
        setProcessing(false);
      });
    }
  };

  /**
   * Triggers the Modal Warning for updating default payment method.
   * Set the default payment method so we can pass it off to the modal to handle.
   *
   * The ChangeDefaultPaymentMethodWarning modal component will have an event
   * handler to attach a new default payment method to the customer
   */
  const handleOnClick = (e, paymentMethod) => {
    e.preventDefault();
    setShowWarning(true);
    setDefaultPaymentMethod(paymentMethod);
  };

  const handleCloseWarning = () => setShowWarning(false);
  const closeDeleteWarning = () => setShowDeleteWarning(false)
  const didCustomerLoad = customer == null || typeof customer == "undefined";

  /**
   * Render an IsLoading component if the component is fetching data.
   */
  return isFetchingData == true ? (
    <Loading message="Loading..." />
  ) : (
    <>
      {console.log("CUSTOMER => ", customer)}
      {console.log("PAYMENT METHODS => ", paymentMethods)}
      {console.log("DEFAULT PAYMENT METHOD => ", defaultPaymentMethod)}

      {/* Notification */}
      <Notification />

      {/* Modal Warning for deleting default payment method */}
      <DeleteDefaultPaymentMethodWarning
        closeModal={closeDeleteWarning}
        show={showDeleteWarning}
        hasSubscriptions={hasSubscriptions}
      />

      {/* Modal for changing default payment method */}
      <ChangeDefaultPaymentMethodWarning
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
        defaultPaymentMethod={defaultPaymentMethod}
        attachDefaultPaymentMethod={attachDefaultPaymentMethod}
        firestoreUser={firestoreUser}
        processing={processing}
      />

      {/* Modal for adding a non-default payment method */}
      <NewCardFormModal
        fetchdata={fetchData}
        customer={customer}
        show={showNewCardForm}
        setShowNewCardForm={() => setShowNewCardForm()}
        onHide={() => setShowNewCardForm(false)}
      />

      {/* Payment Methods Header */}
      <Container>
        <Row sm={12}>
          <Col sm={12}>
            <Title>Your Payment Methods</Title>
            <SubscriptionNotice>
              * Default payment method is used for recurring subscriptions.
            </SubscriptionNotice>
            {didCustomerLoad ? (
              <p style={{ color: "#666666" }}>
                Set a default payment method for subscriptions.
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <br />
        <br />
        <LinkSecondary onClick={() => setShowNewCardForm(true)}>
          Add a credit or debit card
        </LinkSecondary>
        <span>{" - "}MyFloodScore accepts all major credit cards.</span>
        <br />
        <br />
      </Container>

      {/* Render List of Payment Methods */}
      <PaymentMethodsList
        paymentMethods={paymentMethods}
        handleOnClick={handleOnClick}
        detachPaymentMethod={detachPaymentMethod}
        processing={processing}
        customer={customer}
        defaultPaymentMethod={defaultPaymentMethod}
      />
    </>
  );
};

export default PaymentMethods;
