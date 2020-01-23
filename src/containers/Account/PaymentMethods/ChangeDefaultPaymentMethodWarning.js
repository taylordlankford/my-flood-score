import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import {
  TransitionBtn,
  SecondaryBtn
} from "../../../StyledComponents/StyledComponents";

const ChangeDefaultPaymentMethodWarning = props => {
  const {
    showWarning,
    handleCloseWarning,
    attachDefaultPaymentMethod,
    defaultPaymentMethod,
    firestoreUser,
    processing
  } = props;

  return (
    <Modal centered show={showWarning} onHide={handleCloseWarning}>
      {processing ? (
        <>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body>
            <Container
              style={{
                color: "#666666",
                textAlign: "center",
                paddingBottom: "40px"
              }}
            >
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
                Updating your payment method...
              </span>
            </Container>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header
            closeButton
            style={{ borderBottom: "none" }}
          ></Modal.Header>
          <Modal.Body>
            <h5 style={{ color: "#666666" }}>Confirm change default payment method.</h5>
            Changing your <b>default payment method</b> will move your recurring
            subscriptions to the new card.
          </Modal.Body>
          <Container style={{ paddingBottom: "20px" }}>
            {processing ? (
              <TransitionBtn disabled style={{ width: "100%" }}>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Loading...
              </TransitionBtn>
            ) : (
              <TransitionBtn
                style={{ width: "100%" }}
                onClick={e =>
                  attachDefaultPaymentMethod(
                    e,
                    defaultPaymentMethod.id,
                    firestoreUser.customerId
                  )
                }
              >
                Update
              </TransitionBtn>
            )}
            <SecondaryBtn
              onClick={handleCloseWarning}
              style={{
                marginTop: "10px"
              }}
            >
              Close
            </SecondaryBtn>
          </Container>
        </>
      )}
    </Modal>
  );
};

export default ChangeDefaultPaymentMethodWarning;
