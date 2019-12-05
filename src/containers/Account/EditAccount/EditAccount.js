import React, { useState, Fragment } from "react";
import * as ROUTES from "../../../routes/constants/routes";
import { useFirestoreUser, useFirebase } from "../../../hooks";

import { Title, StyledLink } from "../StyledComponents";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUser, FaPhone } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { MdEmail } from "react-icons/md";

import EditAccountForm from "./EditAccountForm";

const EditAccount = props => {
  const userData = useFirestoreUser();
  const firebase = useFirebase();
  const { firestoreUser, loading } = userData;
  const [toggleEditAccountForm, setToggleEditAccountForm] = useState(false);

  if (loading) {
    return "loading...";
  }

  if (!firestoreUser) {
    return "Unauthorized";
  }

  const handleOnClick = (e, firstName, lastName, companyName, phone, email, password) => {
    e.preventDefault();
    console.log(props.history);

    const updatedUser = {
      ...firestoreUser,
      firstName,
      lastName,
      companyName,
      phone,
      email,
      password
    };

    firebase.doFirestoreSet("users", firestoreUser.uid, updatedUser);
    setToggleEditAccountForm(false)
  };

  const disableForm = () => {
    setToggleEditAccountForm(false)
  }

  return (
    <div>
      {toggleEditAccountForm ? (
        <EditAccountForm
          firestoreUser={firestoreUser}
          handleOnClick={handleOnClick}
          disableForm={disableForm}
        />
      ) : (
        <>
          <Card>
            <Card.Body>
              <div style={{ textAlign: "right" }}>
                <StyledLink onClick={() => setToggleEditAccountForm(true)}>
                  Edit
                </StyledLink>
              </div>
              <Row>
                <Title>Account Settings</Title>
              </Row>
              <br />
              <Row>
                <Col sm={3} style={{ textAlign: "right" }}>
                  <div>
                    <b>Name:</b>
                  </div>
                  <div>
                    <b>Company:</b>
                  </div>
                  <div>
                    <b>Email:</b>
                  </div>
                  <div>
                    <b>Phone:</b>
                  </div>
                </Col>
                <Col sm={9}>
                  <div>
                    {firestoreUser.firstName + " " + firestoreUser.lastName}
                  </div>
                  <div>
                    {firestoreUser.companyName === ""
                      ? "---"
                      : firestoreUser.companyName}
                  </div>
                  <div>{firestoreUser.email}</div>
                  <div>{firestoreUser.phone}</div>
                  {console.log(firestoreUser)}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default EditAccount;
