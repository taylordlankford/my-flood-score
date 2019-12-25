import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './Reports.css'

import FloodScoreGauge from '../../components/Charts/FloodScoreGauge'

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
  if (property.MFS < 50) {
    return 'neg'
  }
  return 'pos'
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
  const {
    MFS,
    PROP_ADD,
    PROP_CITY,
    PROP_STATE,
    PROP_ZIP,
    SGE,
    FEMA_BFE,
  } = props
  console.log('in compareReport props:', props)
  return (
    <div id="reportContainer">
      <div className="reportContainer">
        <div className="reportHeader" style={{ position: 'relative', background: 'transparent', boxShadow: 'none', height: '108px' }}>
          <img src={MyFloodSnapShotLogo} alt="logo" />
          <h3 style={{ marginTop: '-30px', position: 'absolute', right: '0', paddingRight: '125px' }}>Compare</h3>
          <div style={{ backgroundImage: 'linear-gradient(to right, #1166bf , transparent)', marginTop: '2px', height: '3px', width: '88%' }} />
        </div>
        <div className="reportSection" style={{ marginTop: '-22px', height: '225px', background: 'transparent', boxShadow: 'none' }}> { /* Section One */ }
          <Container>
            <Row>
              <Col style={{ paddingLeft: '43px' }}>
                <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                <p>{PROP_ADD}, {PROP_CITY}, {PROP_STATE} {PROP_ZIP}</p>
              </Col>
              <Col style={{ position: 'absolute', left: '171px', marginTop: '40px' }}>
                <FloodScoreGauge MFS={MFS} index={0}/>
              </Col>
              <div style={{ borderLeft: '1px solid black', height: '200px' }} />
              <Col style={{ paddingLeft: '43px' }}>
                <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                <p>{PROP_ADD}, {PROP_CITY}, {PROP_STATE} {PROP_ZIP}</p>
              </Col>
              <Col style={{ position: 'absolute', left: '548px', marginTop: '40px' }}>
                  <FloodScoreGauge MFS={MFS} index={1}/>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="reportSection learMore" style={{ background: 'transparent', boxShadow: 'none' }}> { /* Section Two */ }
          <p style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 105px' }}>Review of Key Flood Influencers</span>
            <Container style={{ marginTop: '15px', textAlign: 'left' }}>
              <Row>
                <Col>
                  {keyFloodInfluencers.map((riksLevelObj, index) => {
                    return <KeyInfluencer key={index} property={props} riksLevelObj={riksLevelObj} />
                  })}
                </Col>
                <div style={{ borderLeft: '1px solid black', height: '200px' }} />
                <Col>
                  {keyFloodInfluencers.map((riksLevelObj, index) => {
                    return <KeyInfluencer key={index} property={props} riksLevelObj={riksLevelObj} />
                  })}
                </Col>
              </Row>
            </Container>
          </p>

        </div>
        <div className="reportSection" style={{ padding: '20px' }} > { /* Section Three */ }

        </div>
      </div>
    </div>
  )
}

export default CompareReport
