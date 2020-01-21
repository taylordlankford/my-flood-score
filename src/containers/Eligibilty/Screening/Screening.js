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
  const { selected } = props.location.state
  const { history } = useReactRouter()
  const firebase = useFirebase()
  console.log(firebase)

  const [nffUserData, setNffUserData] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    hideSiteContainers()
  })

  const handleOnClick = async e => {
    e.preventDefault()

    // TOOD: Add screening info to firebase collection
    await firebase.doFirestoreAdd('nff_user', { name, email, phone}).then(data => {
      console.log(data)
      history.push(ROUTES.ELIGIBILITY_RECOMMENDATION, { selected })
    })
  }

  if (nffUserData != null) {
    console.log('selected ==> ', selected)
    console.log('form data ==> ', nffUserData)
  }

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
                    <Form.Control type="name" placeholder="Name" onChange={e => setName(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "#fff" }}>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={{ color: "#fff" }}>Phone</Form.Label>
                    <Form.Control type="phone" placeholder="Phone" onChange={e => setPhone(e.target.value)} />
                  </Form.Group>
                  <Button
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