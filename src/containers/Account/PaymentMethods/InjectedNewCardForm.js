import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AccountContext } from "../AccountContext";
import { CardElement } from "react-stripe-elements";

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
import {
  Title,
  TransitionBtn
} from "../../../StyledComponents/StyledComponents";

const InjectedNewCardForm = props => {
  const {
    customer,
    show,
    setShowNewCardForm,
    stripe,
    elements,
    fetchdata 
  } = props;

  const { firebase } = useContext(AccountContext);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {}, [processing]);

  const handleOnSubmit = async e => {
    e.preventDefault();
    setProcessing(true);

    // Use Elements to get a reference to the Card Element mounted somewhere
    // in your <Elements> tree. Elements will know how to find your Card Element
    const cardElement = elements.getElement("card");

    // Fetch newly created payment method from Stripe's API
    const fetchPaymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });
    const { paymentMethod, error } = fetchPaymentMethod;

    if (error) {
      console.log("erro: ", error);
      setProcessing(false);
    }

    if (typeof paymentMethod != "undefined") {
      // Attach as non-default payment method
      firebase
        .doAttachPaymentMethod(paymentMethod.id, customer.id)
        .then(paymentMethod => {
          console.log("pm: ", paymentMethod);
        });

      // Update our components by fetching the newly added data
      fetchdata();
      setProcessing(false);
      setShowNewCardForm()
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => setShowNewCardForm()}
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
                <p className="errorMessage">{errorMessage}</p>
                <input
                  type="submit"
                  id="submit-form"
                  style={{ display: "none" }}
                />
                {processing ? (
                  <TransitionBtn style={{ marginBottom: "4px" }}>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span style={{ marginLeft: "10px" }}>Processing...</span>
                  </TransitionBtn>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      type="submit"
                      style={{ marginBottom: "4px", width: "100%" }}
                    >
                      Add your card
                    </Button>
                  </>
                )}
                <Button
                  variant="secondary"
                  onClick={() => setShowNewCardForm()}
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
