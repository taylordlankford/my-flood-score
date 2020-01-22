import React, { useEffect, useState } from 'react'
import useReactRouter from 'use-react-router'
import * as ROUTES from '../../../routes/constants/routes'
import { Parallax } from 'react-parallax'
import * as S from '../StyledComponents'
import '../styles.css'
import { hideSiteContainers } from '../helpers'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../../../hooks';

const Screening = (props) => {
  const { history } = useReactRouter();
  const firebase = useFirebase();
  const { selected } = props.location.state;

  const [address, setAddress] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    hideSiteContainers()

    let isAddressSelected =
      typeof selected !== "undefined" || selected !== null;

    if (isAddressSelected) {
      setAddress(selected);
      console.log('address from component => ', address)
    } else {
      history.push(ROUTES.SEARCH_ELIGIBILITY);
    }

    // Valid forms if empty
    if (name !== "" || email !== "" || phone !== "") {
      setIsInvalid(false)
    }

    return () => {}
  })

  const addNffUser = async (collection, setObj) => {
    await firebase.doFirestoreAdd(collection, setObj).then(res => {
      history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { address })
    })
  }

  const handleOnClick = e => {
    e.preventDefault()

    const nffUser = { name, email, phone }
    console.log(nffUser)
    addNffUser("nff_users", nffUser)
  }

  const handlePhoneInput = (e) => {
    console.log('Phone value => ', e.target.value)
    let phoneValue = e.target.value
    setPhone(phoneValue)
  }

  // if (nffUserData != null) {
  //   console.log('selected ==> ', selected)
  // }

  return (
    <S.ParallaxWrapper>
      <Parallax contentClassName="parallax-bg" strength={200}>
        <S.ParallaxContainer>
          <div style={{ paddingBottom: "20px" }}>
            <h4
              style={{
                color: "#FFF",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "32px",
                fontFamily: "Helvetica"
              }}
            >
              You are one step away from getting your FREE screening results!
            </h4>
          </div>
          <Row sm={12}>
            <Col sm={7}></Col>
            <Col sm={5}>
              <div
                style={{
                  backgroundColor: "#201A40",
                  padding: "20px"
                }}
              >
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
              </div>
            </Col>
          </Row>
        </S.ParallaxContainer>
      </Parallax>
    </S.ParallaxWrapper>
  );
}

export default Screening;
