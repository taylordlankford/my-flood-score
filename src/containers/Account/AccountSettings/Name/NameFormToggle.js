import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StyledLink } from "../../../../StyledComponents/StyledComponents";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NameForm from "./NameForm";
import { pushSuccess } from "../../../../redux/actions/notificationActions";

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

    props.firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);
    const currentUser = firestoreUser;
    dispatch(pushSuccess("Successfully updated name.", currentUser));
    setShowNameForm(false);
  };

  return (
    <div style={{ paddingBottom: "40px", borderBottom: "1px solid #eee" }}>
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
            <StyledLink onClick={toggleNameForm}>
              {!showNameForm ? "Edit" : "Cancel"}
            </StyledLink>
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
            <StyledLink onClick={toggleNameForm}>
              {!showNameForm ? "Edit" : "Cancel"}
            </StyledLink>
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
    </div>
  );
};

export default NameFormToggle;
