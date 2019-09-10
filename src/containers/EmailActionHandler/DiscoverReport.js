import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './EmailAction.css'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certificate from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import MFS_Logo from '../../assets/images/MFS_Logo.png'

import Green_House from '../../assets/images/Green_House.svg'
import Blue_House from '../../assets/images/Blue_House.svg'
import Red_House from '../../assets/images/Red_House.svg'

import { useFirebase, useFirestoreUser } from '../../hooks'

import * as ROUTES from '../../constants/routes'
import Button from 'react-bootstrap/Button'
import { auth } from 'firebase'

const LearnMoreBox = ({ title, description, img, link, extra }) => (
  <Container className="learnMoreBox">
    <Row>
      <Col sm={9}>
        <h4>{title}</h4>
        <p>
          {description}
        </p>
        <p>{extra}</p>
      </Col>
      <Col sm={3}>
        <img src={img} alt={title} />
        <Button href={link}>Learn More</Button>
      </Col>
    </Row>
  </Container>
)

const DiscoverReport = ({ history, email, setEmail, actionCode }) => {
  const { firestoreUser } = useFirestoreUser()
  console.log('firestoreUser', firestoreUser)

  const [property, setProperty] = useState(null)
  const [error, setError] = useState(null)

  if (firestoreUser !== null) {
    const { propertyRef } = firestoreUser
    propertyRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch(function(error) {
        console.log("Error getting document:", error)
        setError(error.messsage)
    })
  }


  return (
    <div>
      <h1 className="authHeader">Discover Report</h1>
      <div className="reportContainer" >
        <div className="reportHeader">
          <img src={MFS_Logo} alt="logo" />
        </div>
        <div className="reportSection" style={{ marginTop: '-22px' }}> { /* Section One */ }
          <Container>
            <Row>
              <Col>
                <div style={{ marginBottom: '67px' }}>
                  <img src={Green_House} style={{ width: '45px', left: '48px' }} alt="Green House" />
                  <img src={Blue_House} style={{ width: '60px', left: '97px' }} alt="Blue House" />
                  <img src={Red_House} style={{ width: '45px', left: '142px' }} alt="Red House" />
                </div>
                <p>Property Address</p>
                <p>1023 Dale Mabry Hwy, Tampa, FL 33624</p>
              </Col>
              <Col>
                Cool Graphic
              </Col>
            </Row>
          </Container>
          <div className="warningMessage">
            <h3>A My Flood Score of <span>55</span> falls within the <span>50-70 range</span>. This represents an overal <span>Poor</span> flood risk</h3>
          </div>
        </div>
        <div className="reportSection learMore"> { /* Section Two */ }
          <h3>Want to learn more...</h3>
          <LearnMoreBox
            title="My flood snapshot"
            description="Compare your property's score with that of property another, identify key flood influencers, see how your score compares to your community."
            img={Compare}
            link={ROUTES.HOME}
            extra={null}
          />
          <LearnMoreBox
            title="My flood Analysis Memo"
            description="Your detailed flood risk analysis. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={Examine}
            link={ROUTES.HOME}
            extra="A 5-page report thoroughly reviewing your flood risk!"
          />
          <LearnMoreBox
            title="My flood Safe Certificate"
            description="My flood Safe Certificate is certified by our Professional Water Resource Engineers"
            img={Certificate}
            link={ROUTES.HOME}
            extra="Recommended for MyFloodScores less than 25"
          />
          <LearnMoreBox
            title="Letter of Map Amendment (LOMA)"
            description="Reduce or Eliminate your flood insurance premium through a FEMA Approved Letter of Map Amendment"
            img={Reduce_Eliminate}
            link={ROUTES.HOME}
          />
        </div>
        <div className="reportSection" > { /* Section Three */ }
          <p>
            was developed through analyzing the best available floodplain data, combined with details of the property structure and land parcel.  Additional flood factors were also considered, including your community's commitment to floodplain management.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DiscoverReport
