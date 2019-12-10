import React, { useState } from "react";
import { StyledLink } from "../../../../StyledComponents/StyledComponents";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CompanyForm from "./CompanyForm";
import { useDispatch } from "react-redux";
import { pushSuccess } from "../../../../redux/actions/notificationActions"

const CompanyFormToggle = props => {
  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const dispatch = useDispatch()

  const toggleCompanyForm = () => {
    showCompanyForm === true
      ? setShowCompanyForm(false)
      : setShowCompanyForm(true);
  };

  const updateCompany = (e, firestoreUser, firebase, companyName) => {
    e.preventDefault();
    const updatedFirestoreUser = {
      ...firestoreUser,
      companyName
    };

    setShowCompanyForm(false);
    firebase.doFirestoreSet("users", firestoreUser.uid, updatedFirestoreUser);
    dispatch(pushSuccess("Successfully updated company name"));
  };

  return (
    <Card style={{ border: "none" }}>
      {!showCompanyForm ? (
        <Card.Header
          style={{ padding: "20px 0 20px 0", backgroundColor: "#fff" }}
        >
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Company Name</b>
              </h5>
              <p>
                {props.firestoreUser.companyName === ""
                  ? "Not Provided"
                  : props.firestoreUser.companyName}
              </p>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleCompanyForm}>Edit</StyledLink>
            </Col>
          </Row>
        </Card.Header>
      ) : (
        <Card.Header
          style={{ border: "none", padding: "20px 0 20px 0", backgroundColor: "#fff" }}
        >
          <Row sm={12}>
            <Col sm={10}>
              <h5>
                <b>Company Name (optional)</b>
              </h5>
              <p>
                Enter your company name.
              </p>
            </Col>
            <Col sm={2} style={{ textAlign: "right" }}>
              <StyledLink onClick={toggleCompanyForm}>Cancel</StyledLink>
            </Col>
          </Row>
        </Card.Header>
      )}

      {showCompanyForm ? (
        <Card.Body>
          <CompanyForm
            firestoreUser={props.firestoreUser}
            firebase={props.firebase}
            updateCompany={updateCompany}
          />
        </Card.Body>
      ) : (
        <></>
      )}
    </Card>
  );
};

export default CompanyFormToggle;
