import React, { useEffect, useState, useRef } from "react";
import useReactRouter from "use-react-router";
import * as ROUTES from "../../../routes/constants/routes";
import { Parallax } from "react-parallax";
import styled from "styled-components";
import * as S from "../StyledComponents";
import "../styles.css";
import { hideSiteContainers } from "../helpers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../../../hooks";

const Screening = props => {
  const { history } = useReactRouter();
  const firebase = useFirebase();
  const { selected } = props.location.state;

  const [address, setAddress] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [exists, setExists] = useState(false);

  useEffect(() => {
    hideSiteContainers();
    // validateScreening();

    let isAddressSelected =
      typeof selected !== "undefined" || selected !== null;

    if (isAddressSelected) {
      setAddress(selected);
      console.log("address from component => ", address);
    } else {
      history.push(ROUTES.SEARCH_ELIGIBILITY);
    }

    // if (exists) {
    //   history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { address });
    // }

    // Valid forms if empty
    if (name !== "" || email !== "" || phone !== "") {
      setIsInvalid(false);
    }
  });

  // const validateScreening = async () => {
  //   await firebase
  //     .doFirestoreWhereGet("nff_users", "name", "==", name)
  //     .then(querySnapshot => {
  //       if (querySnapshot.docs != null || querySnapshot.docs !== "undefined") {
  //         setExists(true);
  //       }
  //     });
  // };

  const addNffUser = async (collection, setObj) => {
    await firebase.doFirestoreAdd(collection, setObj).then(res => {
      history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { address });
    });
  };

  const handleOnClick = e => {
    e.preventDefault();

    const nffUser = { name, email, phone };
    console.log(nffUser);
    addNffUser("nff_users", nffUser);
  };

  const handlePhoneInput = e => {
    console.log("Phone value => ", e.target.value);
    let phoneValue = e.target.value;
    setPhone(phoneValue);
  };

  if (exists) {
    return "Loading recommendation.";
  }

  return (
    <S.ParallaxWrapper>
      <Parallax contentClassName="parallax-bg" strength={200}>
        <S.ParallaxContainer>
          <div style={{ paddingBottom: "20px" }}>
            <H3>
              You are one step away from getting your FREE screening results!
            </H3>
          </div>
          <Row sm={12}>
            <Col sm={7}></Col>
            <Col sm={5}>
              <FormWrapper>
                <Form>
                  <Form.Group>
                    <Form.Label style={{ color: "#fff" }}>Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Name"
                      onChange={e => setName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "#fff" }}>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "#fff" }}>Phone</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Phone"
                      onChange={e => handlePhoneInput(e)}
                    />
                  </Form.Group>
                  <Button
                    disabled={isInvalid}
                    variant="primary"
                    type="submit"
                    style={{ backgroundColor: "#C7AE4A", width: "100%" }}
                    onClick={e => handleOnClick(e)}
                  >
                    <span style={{ color: "#000" }}>Submit Request</span>
                  </Button>
                </Form>
              </FormWrapper>
            </Col>
          </Row>
        </S.ParallaxContainer>
      </Parallax>
    </S.ParallaxWrapper>
  );
};

const H3 = styled.div`
  color: #fff;
  text-align: center;
  font-weight: "600";
  font-size: 32px;
  font-family: Helvetica;
`;

const FormWrapper = styled.div`
  background-color: #201a40;
  padding: 20px;
`;

export default Screening;
