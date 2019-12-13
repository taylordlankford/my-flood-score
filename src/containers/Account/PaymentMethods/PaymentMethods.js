import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Title,
  LinkPrimary,
  LinkSecondary,
  TransitionBtn,
  DangerTransitionBtn
} from "../../../StyledComponents/StyledComponents";
import { AccountContext } from "../AccountContext";
import {
  pushDanger,
  pushInfo
} from "../../../redux/actions/notificationActions";
import Notification from "../../../components/Notifications/Notification";

import { MdClose } from "react-icons/md";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import NewCardForm from "./NewCardForm";

const PaymentMethods = () => {
  // Data
  const { firebase, firestoreUser } = useContext(AccountContext);
  const dispatch = useDispatch();

  // States
  const [customer, setCustomer] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [sources, setSources] = useState(null);
  const [subs, setSubs] = useState(null);
  const [showRadioForm, setShowRadioForm] = useState(null);
  const [showNewCardForm, setShowNewCardForm] = useState(null);

  useEffect(() => {}, []);

  return (
    <>
      {showRadioForm ? (
        <Container>
          <NewCardForm
            show={showNewCardForm}
            onHide={() => setShowNewCardForm(false)}
          />

          <Row sm={12}>
            <Col sm={10}>
              <Title>Choose a Payment Method</Title>
            </Col>
            <Col sm={2}>
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
        <Container>
          <Row sm={12}>
            <Col sm={10}>
              <Title>Your Payment Methods</Title>
            </Col>
            <Col sm={2}>
              <LinkSecondary onClick={() => setShowRadioForm(true)}>
                Change
              </LinkSecondary>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PaymentMethods;
