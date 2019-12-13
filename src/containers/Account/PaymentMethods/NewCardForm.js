import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover
} from "react-icons/fa";
import {
  Container,
  Title,
  LinkPrimary,
  LinkSecondary,
  TransitionBtn,
  InfoBtn,
  DangerTransitionBtn
} from "../../../StyledComponents/StyledComponents";

const NewCardForm = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <Title>Add a new credit or debit card</Title>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row sm={12}>
          <Col sm={7}>
            <Form onSubmit={e => e.preventDefault()}>
              <Form.Group>
                <Form.Label>Card Number</Form.Label>
                <Form.Control></Form.Control>
                <br />
                <Form.Label>Name on Card</Form.Label>
                <Form.Control></Form.Control>
                <br />
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control></Form.Control>
              </Form.Group>
              <br />
              <Row sm={12}>
                <Col sm={8}>
                  <TransitionBtn>Add your card</TransitionBtn>
                </Col>
                <Col sm={4}>
                  <InfoBtn onClick={props.onHide}>Close</InfoBtn>
                </Col>
              </Row>
            </Form>
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
  );
};

export default NewCardForm;
