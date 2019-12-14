import React, { useContext, useEffect, useState } from "react";
import * as ROUTES from "../../../routes/constants/routes";
import { useDispatch } from "react-redux";
import { AccountContext } from "../AccountContext";
import Notification from "../../../components/Notifications/Notification";

// Design imports
import {
  Container,
  Title,
  LinkPrimary,
  LinkSecondary,
  TransitionBtn,
} from "../../../StyledComponents/StyledComponents";
import { pushInfo } from "../../../redux/actions/notificationActions";
import Spinner from 'react-bootstrap/Spinner'
import { MdClose } from "react-icons/md";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcDiscover,
  FaCcAmex,
  FaPencilAlt
} from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

// Children components
import NewCardFormModal from "./NewCardFormModal";

const PaymentMethods = (props) => {
  // Data
  const { firebase, firestoreUser } = useContext(AccountContext);
  const dispatch = useDispatch();

  // States
  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showRadioForm, setShowRadioForm] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(null);
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    fetchData();

    // Trigger componentDidMount() when useEffect detect these state changes
  }, [processing, showNewCardForm]);

  const fetchData = async () => {
   if (typeof firestoreUser.customerId !== "undefined") {
     // Set Customer
     firebase.doGetCustomer(firestoreUser.customerId).then(customerData => {
       console.log("customer: ", customerData);
       setCustomer(customerData.data);
     });

     // Set Payment Methods
     firebase
       .doGetPaymentMethods(firestoreUser.customerId)
       .then(paymentMethodsData => {
         console.log("payment methods: ", paymentMethodsData.data.paymentMethods);
         setPaymentMethods(paymentMethodsData.data.paymentMethods);
       });
   }
  }

  // Update default payment method (update default)
  const attachPaymentMethod = (e, pmId, customerId) => {
    e.preventDefault();
    setProcessing(true)
    // Attach a new payment method to Stripe customer through Stripe API
    firebase.doAttachPaymentMethod(pmId, customerId).then(() => {
      // Update the customer with the new default payment method
      firebase.doUpdateCustomerDefaultPaymentMethod(customer, pmId)
      console.log('Customer new default PM: ', customer.invoice_settings.default_payment_method)
      dispatch(pushInfo(`Successfully attached payment method.`));
      fetchData() // refresh the page with new state from Stripe API
      setProcessing(false)
    });
  };

  // Detach payment method (delete)
  const detachPaymentMethod = (e, pmId) => {
    e.preventDefault()
    firebase.doDetachPaymentMethod(pmId).then(() => {
      setProcessing(true)
      console.log("Payment Method detached successfully.");
      dispatch(pushInfo(`Successfully detached payment method.`));
    })
    setProcessing(false);
  }

  // Render correct icon for card type
  const renderCardIcon = cardType => {
    switch (cardType) {
      case "visa": {
        return <><FaCcVisa size={30} /> Ending{" "}</>
      }
      case "mastercard": {
        return <><FaCcMastercard size={30} /> Ending{" "}</>
      }
      case "discover": {
        return <> <FaCcDiscover size={30} /> Ending{" "} </>
      }
      case "amex": {
        return <> <FaCcAmex size={30} /> Ending{" "} </>
      }
      default: {
        return cardType;
      }
    }
  };

  // Display loading message
  if (customer === null || paymentMethods === null) {
    return (
      <>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ marginLeft: "-15px", marginRight: "15px" }}
        />
        <h3>Retrieving your payment methods...</h3>
      </>
    );
  }

  return (
    <>
      <Notification />
      <NewCardFormModal
        customer={customer}
        show={showNewCardForm}
        setProcessing={() => setProcessing()}
        setShowNewCardForm={() => setShowNewCardForm()}
        onHide={() => setShowNewCardForm(false)}
      />
      {showRadioForm ? (
        // Radio Form
        <Container>
          <Row sm={12}>
            <Col sm={10}>
              <Title>Choose a Payment Method</Title>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <LinkSecondary onClick={() => setShowRadioForm(false)}>
                Close
                <MdClose />
              </LinkSecondary>
            </Col>
          </Row>
          <Col style={{ paddingTop: "60px" }}>
            <Form onSubmit={e => e.preventDefault()}>
              {["radio"].map(type => (
                <div key={`default-${type}`} className="mb-3">
                  <Form.Check
                    type={type}
                    id={`default-${type}`}
                    label={`Visa ending in 4242`}
                  />
                </div>
              ))}
              <div style={{ paddingTop: "20px" }}>
                <LinkSecondary onClick={() => setShowNewCardForm(true)}>
                  Add a credit or debit card
                </LinkSecondary>
                <span>{" - "}MyFloodScore accepts all major credit cards.</span>
              </div>
            </Form>
          </Col>
          <Row sm={12} style={{ paddingTop: "40px" }}>
            <Col sm={5}>
              <TransitionBtn>Use this payment method</TransitionBtn>
            </Col>
            <Col sm={7}></Col>
          </Row>
        </Container>
      ) : (
        // Table
        <Container>
          <Row sm={12}>
            <Col sm={10}>
              <Title>Your Payment Methods</Title>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <LinkSecondary onClick={() => setShowRadioForm(true)}>
                Change
              </LinkSecondary>
              <Button>
              </Button>
            </Col>
          </Row>
          <br />
          <br />
          <LinkSecondary onClick={() => setShowNewCardForm(true)}>
            Add a credit or debit card
          </LinkSecondary>
          <span>{" - "}MyFloodScore accepts all major credit cards.</span>
          <Table style={{ marginTop: "40px" }}>
            <thead>
              <tr>
                <th>Your credit and debit cards</th>
                <th>Expiration Date</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render list of payment methods */}
              {paymentMethods.map((paymentMethod, idx) =>
                // Highlight Default Payment Method
                paymentMethod.id ===
                customer.invoice_settings.default_payment_method ? (
                  <tr key={idx} style={{ backgroundColor: "#eeeeee" }}>
                    <td>
                      {renderCardIcon(paymentMethod.card.brand)} in{" "}
                      {paymentMethod.card.last4}{" "}
                      <Badge
                        style={{ backgroundColor: "#8560a8", color: "#fff" }}
                      >
                        Default
                      </Badge>
                    </td>
                    <td>
                      {paymentMethod.card.exp_month +
                        " / " +
                        paymentMethod.card.exp_year}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <DropdownButton
                        variant="success"
                        alignRight
                        title="Change"
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item disabled eventKey="1">
                          Set as Default
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">Edit Card</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item disabled eventKey="3">
                          Remove
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ) : (
                  // Show non-default payment methods
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
                    <td style={{ textAlign: "center" }}>
                      <DropdownButton
                        variant="success"
                        alignRight
                        title="Change"
                        id="dropdown-menu-align-right"
                      >
                        <Dropdown.Item
                          eventKey="1"
                          onClick={e =>
                            attachPaymentMethod(
                              e,
                              paymentMethod.id,
                              firestoreUser.customerId
                            )
                          }
                        >
                          Set as Default
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">Edit Card</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="4"
                          onClick={e =>
                            detachPaymentMethod(e, paymentMethod.id)
                          }
                        >
                          Remove
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                )
              ) // EOF MAP
              }
            </tbody>
          </Table>
        </Container>
      )}
    </>
  );
};

export default PaymentMethods;