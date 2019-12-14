import React, { useState, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AccountContext } from "../AccountContext";
import { CardElement } from "react-stripe-elements";

// Notifications
import {
  pushInfo,
  pushDanger
} from "../../../redux/actions/notificationActions";

// Stripe
import { injectStripe } from "react-stripe-elements";

// Styles
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover
} from "react-icons/fa";
import { Title } from "../../../StyledComponents/StyledComponents";

const InjectedNewCardForm = props => {
  const { firebase } = useContext(AccountContext);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    setPaymentProcessing(false);
    setCustomer(props.customer);
  }, []);

  const handleOnSubmit = async e => {
    e.preventDefault();
    setPaymentProcessing(true);

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    const cardElement = props.elements.getElement("card");

    // Fetch newly created payment method from Stripe's API
    const fetchPaymentMethod = await props.stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });
    const { paymentMethod, error } = fetchPaymentMethod;

    if (error) {
      console.log("erro: ", error);
    }

    // Attach as non-default payment method
    firebase
      .doAttachPaymentMethod(paymentMethod.id, props.customer.id)
      .then(paymentMethod => {
        console.log("pm: ", paymentMethod);
      });

    props.setProcessing(true);
    props.setShowNewCardForm(false);
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={props.show}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <Title>Add a new credit or debit card</Title>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row sm={12}>
            <Col sm={7}>
              <form onSubmit={e => handleOnSubmit(e)}>
                <div style={{ paddingBottom: "100px" }}>
                  <CardElement
                    onChange={() => setErrorMessage("")}
                    style={{
                      base: { border: "1px solid #eee", fontSize: "18px" }
                    }}
                  />
                </div>
                <input
                  type="submit"
                  id="submit-form"
                  style={{ display: "none" }}
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginBottom: "4px", width: "100%" }}
                >
                  Add your card
                </Button>
                <Button
                  variant="secondary"
                  onClick={props.onHide}
                  style={{
                    width: "100%",
                    borderColor: "#d4d4d4",
                    backgroundColor: "#d4d4d4"
                  }}
                >
                  Close
                </Button>
              </form>
            </Col>
            <Col sm={5}>
              <div>MyFloodScore accepts all major credit cards.</div>
              <br />
              <div>
                <FaCcVisa size={60} />
                <FaCcMastercard size={60} />
                <FaCcDiscover size={60} />
                <FaCcAmex size={60} />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default injectStripe(InjectedNewCardForm);
