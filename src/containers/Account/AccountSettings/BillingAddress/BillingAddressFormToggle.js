import React, { useState } from "react";
import { StyledLink } from "../../../../StyledComponents/StyledComponents";
import { AccountSettingsFormContainer } from "../../StyledComponents/StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BillingAddressForm from "./BillingAddressForm";
import { useDispatch } from "react-redux";
import { pushSuccess } from "../../../../redux/actions/notificationActions";

const BillingAddressFormToggle = props => {
  const [showBillingAddressForm, setShowBillingAddressForm] = useState(false);
  const dispatch = useDispatch();

  const toggleBillingAddressForm = () => {
    showBillingAddressForm === true
      ? setShowBillingAddressForm(false)
      : setShowBillingAddressForm(true);
  };

  const updateBillingAddress = (e, streetAddress1, streetAddress2) => {
    e.preventDefault();
    const updatedFirestoreUser = {
      ...props.firestoreUser,
      streetAddress1,
      streetAddress2
    };

    setShowBillingAddressForm(false);
    props.firebase.doFirestoreSet(
      "users",
      props.firestoreUser.uid,
      updatedFirestoreUser
    );
    dispatch(pushSuccess("Successfully updated Billing Address."));
  };

  return (
    <AccountSettingsFormContainer>
      {!showBillingAddressForm ? (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Billing Address</b>
            </h5>
            <div>{props.firestoreUser.streetAddress1}</div>
            <div>{props.firestoreUser.streetAddress2}</div>
            <div>{props.firestoreUser.country}</div>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <StyledLink onClick={toggleBillingAddressForm}>Edit</StyledLink>
          </Col>
        </Row>
      ) : (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Billing Address*</b>
            </h5>
            <p>Enter a valid billing address.</p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <StyledLink onClick={toggleBillingAddressForm}>Cancel</StyledLink>
          </Col>
        </Row>
      )}
      {showBillingAddressForm ? (
        <BillingAddressForm
          firestoreUser={props.firestoreUser}
          firebase={props.firebase}
          updateBillingAddress={updateBillingAddress}
        />
      ) : (
        <></>
      )}
    </AccountSettingsFormContainer>
  );
};

export default BillingAddressFormToggle;
