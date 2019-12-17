import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AccountContext } from "../AccountContext";

// Styles
import {
  Container,
  Title,
  LinkSecondary,
  TransitionBtn,
  DefaultPaymentMethodTag
} from "../../../StyledComponents/StyledComponents";
import { pushInfo } from "../../../redux/actions/notificationActions";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./PaymentMethods.css";

// Functions
import { renderCardIcon } from "./renderCardIcon";

// Components
import Notification from "../../../components/Notifications/Notification";
import NewCardFormModal from "./NewCardFormModal";
import ChangeDefaultPaymentMethodWarning from "./ChangeDefaultPaymentMethodWarning";

const PaymentMethods = () => {
  // Data
  const { firebase, firestoreUser } = useContext(AccountContext);
  const dispatch = useDispatch();

  // States
  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showNewCardForm, setShowNewCardForm] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loadDefaultPm, setLoadDefaultPm] = useState(null);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState(null);

  useEffect(() => {
    fetchData();
  }, [processing, showNewCardForm, showWarning, loadDefaultPm]);

  // Fetch customer, default payment method, payment methods from Stripe
  const fetchData = async () => {
    if (typeof firestoreUser.customerId !== "undefined") {
      // Set Customer
      firebase
        .doGetCustomer(firestoreUser.customerId)
        .then(customerData => {
          setCustomer(customerData.data);
          const defaultPmId =
            customerData.data.invoice_settings.default_payment_method;

          // Get Customer's default payment method object from ID
          firebase.doGetPaymentMethod(defaultPmId).then(pm => {
            setDefaultPaymentMethod(pm.data.paymentMethod);
          });
        })
        .then(() => {
          // Get Payment Methods
          firebase
            .doGetPaymentMethods(firestoreUser.customerId)
            .then(paymentMethodsData => {
              setPaymentMethods(paymentMethodsData.data.paymentMethods);
            });
        });
    }
  };

  const handleCloseWarning = () => setShowWarning(false);

  const handleOnClick = (e, paymentMethod) => {
    e.preventDefault();
    setShowWarning(true);
    setLoadDefaultPm(paymentMethod);
    // setDefaultPaymentMethod(paymentMethod);
  };

  // Update default payment method
  const attachDefaultPaymentMethod = (e, pmId, customerId) => {
    e.preventDefault();
    setProcessing(true);
    // Attach a new payment method to Stripe customer through Stripe API
    firebase
      .doAttachPaymentMethod(pmId, customerId)
      .then(() => {
        // Update the customer with the new default payment method
        firebase
          .doUpdateCustomerDefaultPaymentMethod(customer, pmId)
          .then(() => {
            // refresh the page with new state from Stripe API
            fetchData();
            setShowWarning(false);
            setProcessing(false);
            setDefaultPaymentMethod(loadDefaultPm);
            dispatch(pushInfo(`${loadDefaultPm.card.brand} ending in ${loadDefaultPm.card.last4} is your new default payment method.`));
          });
      })
  };

  // Detach payment method (delete)
  const detachPaymentMethod = (e, pmId) => {
    e.preventDefault();
    setProcessing(true)
    firebase.doDetachPaymentMethod(pmId).then(() => {
      setProcessing(true);
      console.log("Payment Method detached successfully.");
      dispatch(pushInfo(`Successfully removed payment method.`));
      setProcessing(false);
    });
  };

  const isLoading =
    customer === null ||
    paymentMethods === null ||
    defaultPaymentMethod === null

  // Display loading message
  if (isLoading) {
    return (
      <Container style={{ textAlign: "center", color: "#666666" }}>
        <Spinner
          as="span"
          animation="border"
          size="lg"
          role="status"
          aria-hidden="true"
          style={{
            marginLeft: "-15px",
            marginRight: "15px"
          }}
        />
        <span style={{ fontSize: "28px" }}>
          Retrieve your payment methods...
        </span>
      </Container>
    );
  }

  return (
    <>
      {console.log(customer)}
      {console.log(paymentMethods)}
      <Notification />

      {/* Modals */}
      <ChangeDefaultPaymentMethodWarning
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
        loadDefaultPm={loadDefaultPm}
        attachDefaultPaymentMethod={attachDefaultPaymentMethod}
        firestoreUser={firestoreUser}
        processing={processing}
      />
      <NewCardFormModal
        customer={customer}
        show={showNewCardForm}
        setShowNewCardForm={() => setShowNewCardForm()}
        onHide={() => setShowNewCardForm(false)}
      />

      {/* Payment Methods */}
      <Container>
        <Row sm={12}>
          <Col sm={12}>
            <Title>Your Payment Methods</Title>
            <p style={{ color: "#666666" }}>
              *Default payment method is used for recurring subscriptions.
            </p>
          </Col>
        </Row>
        <br />
        <br />
        <LinkSecondary onClick={() => setShowNewCardForm(true)}>
          Add a credit or debit card
        </LinkSecondary>
        <span>{" - "}MyFloodScore accepts all major credit cards.</span>
        {/* Table */}
        <Table style={{ marginTop: "40px" }}>
          <thead>
            <tr>
              <th>Your credit and debit cards</th>
              <th>Expiration Date</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: "#eeeeee"
              }}
            >
              <td>
                {renderCardIcon(defaultPaymentMethod.card.brand)} in{" "}
                {defaultPaymentMethod.card.last4}{" "}
              </td>
              <td>
                {defaultPaymentMethod.card.exp_month +
                  " / " +
                  defaultPaymentMethod.card.exp_year}
              </td>
              <td style={{ textAlign: "center" }}>
                <DefaultPaymentMethodTag>Default</DefaultPaymentMethodTag>
              </td>
            </tr>
            {/* Render list of payment methods */}
            {paymentMethods.map((paymentMethod, idx) =>
              // Highlight Default Payment Method
              paymentMethod.id !== defaultPaymentMethod.id ? (
                // Show only non-default payment methods
                <tr key={idx}>
                  <td>
                    {renderCardIcon(paymentMethod.card.brand)} in{" "}
                    {paymentMethod.card.last4}
                  </td>
                  <td>
                    {paymentMethod.card.exp_month +
                      " / " +
                      paymentMethod.card.exp_year}
                  </td>
                  <td
                    style={{
                      textAlign: "center"
                    }}
                  >
                    {processing ? (
                      <TransitionBtn disabled style={{ width: "50%" }}>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      </TransitionBtn>
                    ) : (
                      <>
                        <DropdownButton
                          variant="secondary"
                          alignRight
                          title="Update"
                          id="dropdown-menu-align-right"
                        >
                          <Dropdown.Item
                            eventKey="1"
                            onClick={e => handleOnClick(e, paymentMethod)}
                          >
                            Set as Default
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            eventKey="2"
                            onClick={e =>
                              detachPaymentMethod(e, paymentMethod.id)
                            }
                          >
                            Remove
                          </Dropdown.Item>
                        </DropdownButton>
                      </>
                    )}
                  </td>
                </tr>
              ) : (
                <></>
              )
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default PaymentMethods;
