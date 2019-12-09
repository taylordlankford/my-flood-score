import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { PrimaryBtn } from "../../../../StyledComponents/StyledComponents";
import UpdateEmailConfirmation from "./UpdateEmailConfirmation";

const EmailForm = props => {
  const [modalShow, setModalShow] = React.useState(false);
  const [email, setEmail] = useState(props.firestoreUser.email);
  const [error, setError] = useState(null);
  const isInvalid = email === "";

  const updateEmail = (e, passwordConfirmation) => {
    e.preventDefault();

    const userToUpdate = {
      ...props.firestoreUser,
      email
    };

    /*
     * Re-authenticate the user.
     * then update the user auth email (to sign in)
     * then update the user's firestore document email
     * then hide the modal.
     */
    props.firebase
      .doSignInWithEmailAndPassword(
        props.firestoreUser.email,
        passwordConfirmation
      )
      .then(() => {
        props.firebase
          .doEmailUpdate(email)
          .then(() => {
            props.firebase.doFirestoreSet(
              "users",
              props.firestoreUser.uid,
              userToUpdate
            );
          })
          .then(() => {
            setModalShow(false);
          });
      })
      .catch(error => {
        setError(error);
      });
  };

  const handleOnClick = e => {
    e.preventDefault();
    setModalShow(true);
  };

  return (
    <div style={{ paddingBottom: "40px", borderBottom: "1px solid #eee" }}>
      <UpdateEmailConfirmation
        firestoreUser={props.firestoreUser}
        show={modalShow}
        onHide={() => setModalShow(false)}
        updateEmail={updateEmail}
        error={error}
      />
      <Form onSubmit={e => e.preventDefault()}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                defaultValue={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                name="email"
                placeholder="Enter Email Address"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={2} style={{ textAlign: "left" }}>
            <PrimaryBtn disabled={isInvalid} onClick={e => handleOnClick(e)}>
              Save
            </PrimaryBtn>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
};

export default EmailForm;
