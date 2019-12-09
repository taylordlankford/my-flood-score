import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { PrimaryBtn } from "../../../../StyledComponents/StyledComponents";

const CompanyForm = props => {
  const [companyName, setCompanyName] = useState(props.firestoreUser.companyName);

  return (
    <div style={{ paddingBottom: "40px", borderBottom: "1px solid #eee" }}>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                defaultValue={companyName}
                onChange={e => setCompanyName(e.target.value)}
                type="text"
                name="company name"
                placeholder="Enter Company Name"
              />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm={2} style={{ textAlign: "left" }}>
            <PrimaryBtn
              onClick={e =>
                props.updateCompany(
                  e,
                  props.firestoreUser,
                  props.firebase,
                  companyName
                )
              }
            >
              Save
            </PrimaryBtn>
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </div>
  );
};

export default CompanyForm;
