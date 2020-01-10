import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Container, LinkPrimary } from "../../../../StyledComponents/StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NameForm from "./NameForm";
import { update } from "../../../../redux/actions/userActions";
import { pushSuccess, pushWarning } from "../../../../redux/actions/notificationActions";
// import { useFirebase } from "../../../../hooks"

const NameFormToggle = props => {
  const [showNameForm, setShowNameForm] = useState(false);
  const dispatch = useDispatch();

  const toggleNameForm = () => {
    showNameForm === true ? setShowNameForm(false) : setShowNameForm(true);
  };

  const handleNameChange = (
    e,
    firestoreUser,
    firebase,
    firstName,
    lastName
  ) => {
    e.preventDefault();
    const updatedUser = {
      ...firestoreUser,
      firstName,
      lastName
    };

    // Update the Firestore User
    props.firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);

    // Update the Auth User
    let user = props.firebase.auth.currentUser;
    const currentUser = firestoreUser;

    user.updateProfile({
      displayName: updatedUser.firstName
    }).then(() => {
     dispatch(pushSuccess("Successfully updated name."));
     dispatch(update())
    }).catch(error => {
     dispatch(pushWarning('', error));
    })

    dispatch(pushSuccess("Successfully updated name.", currentUser));
    setShowNameForm(false);
  };

  return (
    <Container padding="0 0 20px 0" borderBottom="1px solid #eee">
      {!showNameForm ? (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Legal Name</b>
            </h5>
            <p>
              {props.firestoreUser.firstName +
                " " +
                props.firestoreUser.lastName}
            </p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <LinkPrimary onClick={toggleNameForm}>
              {!showNameForm ? "Edit" : "Cancel"}
            </LinkPrimary>
          </Col>
        </Row>
      ) : (
        <Row sm={12}>
          <Col sm={10}>
            <h5>
              <b>Legal Name*</b>
            </h5>
            <p>
              This is the name on your travel document, which could be a license
              or a passport.
            </p>
          </Col>
          <Col sm={2} style={{ textAlign: "right" }}>
            <LinkPrimary onClick={toggleNameForm}>
              {!showNameForm ? "Edit" : "Cancel"}
            </LinkPrimary>
          </Col>
        </Row>
      )}

      {showNameForm ? (
        <NameForm
          firestoreUser={props.firestoreUser}
          firebase={props.firebase}
          handleNameChange={handleNameChange}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default NameFormToggle;
