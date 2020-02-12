import React, { useEffect, useState, useRef } from "react";
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
  const firebase = useFirebase();
  // const { selected } = props.location.state;
  const { selected, setShowRecommendation } = props;

  const [address, setAddress] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [exists, setExists] = useState(false);

  useEffect(() => {
    let hideSurrounding =
      window.location.href === "https://flood-score.firebaseapp.com/search-eligibility" ||
      window.location.href === "http://localhost:3001/search-eligibility";

    if (hideSurrounding) {
      hideSiteContainers();
    }

    let isAddressSelected =
      typeof selected !== "undefined" || selected !== null;

    if (name !== "" || email !== "" || phone !== "") {
      setIsInvalid(false);
    }
  });

  const addNffUser = async (collection, setObj) => {
    await firebase.doFirestoreAdd(collection, setObj).then(res => {
      setShowRecommendation(true);
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
  margin: 0 auto;
  max-width: 930px;
`;

export default Screening;
