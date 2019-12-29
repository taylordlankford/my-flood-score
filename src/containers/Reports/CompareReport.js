import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './Reports.css'

import FloodScoreGauge from '../../components/Charts/FloodScoreGauge'
import ComparisonChart from './ComparisonChart'

import Compare from '../../assets/images/Compare.svg'
import Examine from '../../assets/images/Examine.svg'
import Certificate from '../../assets/images/Certificate.svg'
import Reduce_Eliminate from '../../assets/images/Reduce_Eliminate.svg'
import MFS_Logo from '../../assets/images/MFS_Logo.png'
import MyFloodSnapShotLogo from '../../assets/images/MyFloodSnapShot_Logo.svg'
import GreenDrop from '../../assets/images/green-drop.png'
import OrangeDrop from '../../assets/images/orange-drop.png'

import Green_House from '../../assets/images/Green_House.svg'
import Blue_House from '../../assets/images/Blue_House.svg'
import Red_House from '../../assets/images/Red_House.svg'
import MFS_Text_Logo from '../../assets/images/MFS_Text_Logo.svg'


import * as ROUTES from '../../routes/constants/routes'

const range = [
  {
    under: 0,
    result: 'Very Good'
  },
  {
    under: 20,
    result: 'Very Good',
  },
  {
    under: 30,
    result: 'Good',
  },
  {
    under: 50,
    result: 'Fair',
  },
  {
    under: 70,
    result: 'Poor',
  },
  {
    under: 95,
    result: 'Extremely Poor',
  }
]

const getRiskLevel = (property) => {
  console.log('property in risk level', property)
  if (property.FEMA_ZONE === 'X, AREA OF MINIMAL FLOOD HAZARD' || property.FEMA_ZONE === 'X, 0.2 PCT ANNUAL CHANCE FLOOD HAZARD') {
    return 'pos'
  }
  return 'neg'
}

const getStructure = (property) => {
  return 'pos'
}

const getImpacts = (property) => {
  return 'pos'
}

const getCRS = (property) => {
  if (property.CRS < 6) {
    return 'neg'
  }
  return 'pos'
}


const keyFloodInfluencers = [
  {
    pos: 'LowRisk Flood Zone',
    neg: 'HighRisk Flood Zone',
    func: getRiskLevel,
  },
  {
    pos: 'Structure is considerably higher than nearest high-risk zone',
    neg: 'Potential impacts to building structure',
    func: getStructure,
  },
  {
    pos: 'No parcel or structure impacts',
    neg: 'property is completely within',
    func: getImpacts,
  },
  {
    pos: 'Good Community Rating System (CRS) Score',
    neg: 'Pood Community Rating System (CRS) Score',
    func: getCRS,
  },
]

const KeyInfluencer = ({ riksLevelObj, property }) => {
  const res = riksLevelObj.func(property)
  return (
    <div style={{ padding: '10px' }}>
      <img src={(res === 'pos' ? GreenDrop : OrangeDrop)} style={{ position: 'relative', float: 'left'  }} />
      <span>{riksLevelObj[res]}</span>
    </div>
  )
}

const CompareReport = (props) => {
  const [property1, setProperty1] = useState(null)
  const [property2, setProperty2] = useState(null)
  const [distributionDoc, setDistributionDoc] = useState(null)
  const { report, firebase } = props

  useEffect(() => {
      // property 1
      report.property1.get().then((doc) => {
        if (doc.exists) {
          setProperty1(doc.data())
        } else {
          console.log("No such document!")
          setProperty1("not found")
        }
      }).catch(function(error) {
        console.log("Error getting document:", error)
        setProperty1("not found")
      })
      // property 2
      report.property2.get().then((doc) => {
        if (doc.exists) {
          setProperty2(doc.data())
        } else {
          console.log("No such document!")
          setProperty2("not found")
        }
      }).catch(function(error) {
        console.log("Error getting document:", error)
        setProperty2("not found")
      })
      firebase.doFirestoreDocGet('zipCodes', '2JOexGsMVKCNAsiXoaPn')
        .then((doc) => {
          console.log('zip doc:', doc)
          setDistributionDoc(doc)
        })
        .catch((err) => {
          console.log('error:', err)
        })
  }, [])

  if (!property1 || !property2) {
    return 'loading...'
  }
  if (property1 === "not found" || property2 === "not found") {
    return 'No Report Found'
  }

  return (
    <div id="reportContainer">
      <h3 className="authHeader" style={{ textAlign: 'center', fontWeight: 'bold', color: '#595959' }}>
        Compare Report
      </h3>
      <div className="reportContainer">
        <div className="reportHeader" style={{ position: 'relative', background: 'transparent', boxShadow: 'none', height: '108px' }}>
          <img src={MyFloodSnapShotLogo} alt="logo" />
          <h3 style={{ marginTop: '-30px', position: 'absolute', right: '0', paddingRight: '125px' }}>Compare</h3>
          <div style={{ backgroundImage: 'linear-gradient(to right, #1166bf , transparent)', marginTop: '2px', height: '3px', width: '88%' }} />
        </div>
        <div className="reportSection" style={{ marginTop: '-22px', height: '250px', background: 'transparent', boxShadow: 'none' }}> { /* Section One */ }
          <Container>
            <Row>
              <Col style={{ paddingLeft: '30px' }}>
                <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                <p style={{ marginLeft: '14px' }}>{property1.PROP_ADD}, {property1.PROP_CITY}, {property1.PROP_STATE} {property1.PROP_ZIP}</p>
                <img style={{ position: 'relative', marginTop: '-30px', width: '190px' }} src={MFS_Logo} />
                <img style={{ position: 'relative', marginTop: '-30px', width: '40px' }} src={Blue_House} />
              </Col>
              <Col style={{ position: 'absolute', left: '171px', marginTop: '95px' }}>
                <FloodScoreGauge MFS={property1.MFS} index={0}/>
              </Col>
              <div style={{ borderLeft: '1px solid black', height: '350px' }} />
              <Col style={{ paddingLeft: '30px' }}>
                <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                <p style={{ marginLeft: '14px' }}>{property2.PROP_ADD}, {property2.PROP_CITY}, {property2.PROP_STATE} {property2.PROP_ZIP}</p>
                <img style={{ position: 'relative', marginTop: '-30px', width: '190px' }} src={MFS_Logo} />
                <img style={{ position: 'relative', marginTop: '-30px', width: '40px' }} src={Green_House} />
              </Col>
              <Col style={{ position: 'absolute', left: '548px', marginTop: '95px' }}>
                  <FloodScoreGauge MFS={property2.MFS} index={1}/>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="reportSection learMore" style={{ background: 'transparent', boxShadow: 'none' }}> { /* Section Two */ }
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 105px' }}>Review of Key Flood Influencers</span>
            <Container style={{ marginTop: '15px', textAlign: 'left' }}>
              <Row style={{ marginTop: '27px' }}>
                <Col>
                  {keyFloodInfluencers.map((riksLevelObj, index) => {
                    return <KeyInfluencer key={index} property={property1} riksLevelObj={riksLevelObj} />
                  })}
                </Col>
                <div style={{ borderLeft: '1px solid black', height: '200px' }} />
                <Col>
                  {keyFloodInfluencers.map((riksLevelObj, index) => {
                    return <KeyInfluencer key={index} property={property2} riksLevelObj={riksLevelObj} />
                  })}
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <div className="reportSection" style={{ padding: '20px', background: 'transparent', boxShadow: 'none' }} > { /* Section Three */ }
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 105px' }}>My Flood Score comparison between both properties</span>
            <Container style={{ marginTop: '15px', textAlign: 'left' }}>
              <Row style={{ marginTop: '27px' }}>
                <Col style={{ marginTop: '-35px' }}>
                  <ComparisonChart distributionDoc={distributionDoc} />
                </Col>
                <div style={{ borderLeft: '1px solid black', height: '200px' }} />
                <Col style={{ marginTop: '-35px' }}>
                  <ComparisonChart distributionDoc={distributionDoc} />
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompareReport
