import React from "react";
import useReactRouter from "use-react-router"
import * as ROUTES from "../../../routes/constants/routes";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TransitionBtn, LinkPrimary } from "../../../StyledComponents/StyledComponents"

const DeleteDefaultPaymentMethodWarning = props => {
  const { closeModal, show, defaultpm, hasSubscriptions } = props;
  const { history } = useReactRouter();

  const handleClick = () => {
    history.push(ROUTES.ACCOUNT_SUBSCRIPTIONS)
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={closeModal}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {console.log("default pm: ", defaultpm)}
        {!hasSubscriptions ? (
          <></>
        ) : (
          <p style={{ color: "#666666", fontSize: "18px" }}>
            There are recurring subscriptions connected to this card. You must cancel your
            subscriptions or move your default payment method to a new card
            first. View your <LinkPrimary onClick={() => handleClick()}>subscriptions</LinkPrimary>.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!hasSubscriptions ? (
          <TransitionBtn onClick={closeModal}>
            Delete Card
          </TransitionBtn>
        ) : (
          <TransitionBtn disabled onClick={closeModal}>
            Delete Card
          </TransitionBtn>
        )}
        <TransitionBtn onClick={closeModal}>
          Close
        </TransitionBtn>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteDefaultPaymentMethodWarning;
