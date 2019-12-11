import React, { useEffect, useState } from "react";
import { StyledLink } from "../../../../StyledComponents/StyledComponents";
import { AccountSettingsFormContainer } from "../../StyledComponents/StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EmailForm from "./EmailForm";

const EmailFormToggle = props => {
  const [showEmailForm, setShowEmailForm] = useState(false);

  const toggleEmailForm = () => {
    showEmailForm === true ? setShowEmailForm(false) : setShowEmailForm(true);
  };

  // When the firestore User email updates from firebase, hide the form.
  useEffect(() => {
    setShowEmailForm(false);
  }, [props.firestoreUser.email]);

  return (
    <AccountSettingsFormContainer>
      {!showEmailForm ? (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Email Address</b>
            </h5>
            <p>{props.firestoreUser.email}</p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <StyledLink onClick={toggleEmailForm}>Edit</StyledLink>
          </Col>
        </Row>
      ) : (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Email Address*</b>
            </h5>
            <p>Use an email address you’ll always have access to.</p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <StyledLink onClick={toggleEmailForm}>Cancel</StyledLink>
          </Col>
        </Row>
      )}

      {showEmailForm ? (
        <EmailForm
          firestoreUser={props.firestoreUser}
          firebase={props.firebase}
          // updateEmail={updateEmail}
        />
      ) : (
        <></>
      )}
    </AccountSettingsFormContainer>
  );
};

export default EmailFormToggle;
