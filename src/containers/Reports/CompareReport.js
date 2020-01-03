import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import './Reports.css'

import FloodScoreGauge from '../../components/Charts/FloodScoreGauge'
import ComparisonChart from './ComparisonChart'
import { AddFloodplainInfo, MFSRangeImg } from './CompareReportComponents/Components'

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


const getFEMARiskLevel = (property) => {
  if (property.FEMA_ZONE === 'X, AREA OF MINIMAL FLOOD HAZARD' || property.FEMA_ZONE === 'X, 0.2 PCT ANNUAL CHANCE FLOOD HAZARD') {
    return 'pos'
  }
  return 'neg'
}

const getStructure = (property) => {
  if ((property.SGE - property.BA_PPE) <= -4 ) {
    return 'pos'
  }
  return 'neg'
}

const getImpacts = (property) => {
  if (property.STRUC_PCT === 0 && property.PARCEL_PCT === 0) {
    return 'pos'
  } else if (property.STRUC_PCT === 100 && property.PARCEL_PCT === 100) {
    return 'neg'
  } else if (property.STRUC_PCT < 25) {
    return 'potential'
  } else if (property.STRUC_PCT < 50) {
    return 'substantial'
  } else {
    return 'majority'
  }
}

const getCRS = (property) => {
  if (property.CRS < 6) {
    return 'pos'
  }
  return 'neg'
}

const getLOMARecommendation = (property) => {
  if (property.LOMA === 0) {
    return 'N/A'
  } else if (property.LOMA === 1) {
    return 'Low'
  } else if (property.LOMA === 2) {
    return 'Medium'
  } else if (property.LOMA === 3) {
    return 'High'
  } else {
    return 'N/A'
  }
}

const getGenerallyAgrees = (property) => {
  console.log('property.BA_FLDZONE_S', property.BA_FLDZONE_S)
  console.log('property.BA_FLDZONE_S !== 4', property.BA_FLDZONE_S !== 4)
  console.log('getLOMARecommendation(property)', getFEMARiskLevel(property))
  if (property.BA_FLDZONE_S === undefined) {
    return 'generally agrees'
  } else if (property.BA_FLDZONE_S === 4 && getFEMARiskLevel(property) === 'pos') {
    return 'generally agrees'
  } else if (property.BA_FLDZONE_S !== 4 && !(getFEMARiskLevel(property) === 'pos')) {
    return 'generally agrees'
  } else {
    return 'does not agree'
  }
}


const keyFloodInfluencers = [
  {
    pos: 'LowRisk Flood Zone',
    neg: 'HighRisk Flood Zone',
    func: getFEMARiskLevel,
  },
  {
    pos: 'Structure is considerably higher than nearest high-risk zone',
    neg: 'Potential impacts to building structure',
    func: getStructure,
  },
  {
    pos: 'No parcel or structure impacts',
    neg: 'property is completely within',
    potential: 'Potential structure impacts from high-risk floodplain',
    substantial: 'Substantial portion of structure impacted by high-risk floodplain',
    majority: 'Majority of structure impacted by high-risk floodplain',
    func: getImpacts,
  },
  {
    pos: 'Good Community Rating System (CRS) Score',
    neg: 'Community Rating System (CRS) Score could use improvement',
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
  const [distributionData1, setDistributionData1] = useState(null)
  const [distributionData2, setDistributionData2] = useState(null)
  const { report, firebase } = props

  useEffect(() => {
      getAllData()
  }, [])

  const getAllData = async () => {
    const { property1, property2, distributionType } = report
    // property 1
    const propertyOneData = await getPropertyData(property1)
    setProperty1(propertyOneData)
    console.log('property1:', propertyOneData)
    // property 2
    const propertyTwoData = await getPropertyData(property2)
    setProperty2(propertyTwoData)
    console.log('property2:', propertyTwoData)
    // Get Score Distribution Data
    const distributionData1 = await getDistributionData(distributionType, propertyOneData)
    setDistributionData1(distributionData1)
    const distributionData2 = await getDistributionData(distributionType, propertyTwoData)
    setDistributionData2(distributionData2)
  }

  const getPropertyData = async (propertyRef) => {
    const doc = await propertyRef.get()
    if (doc.exists) {
      return await doc.data()
    } else {
      return 'not found'
    }
  }

  const getDistributionData = async (distributionType, propertyData) => {
    console.log('distributionType', distributionType)
    const v = (distributionType === 'zipCodes') ? propertyData.PROP_ZIP.toString() : propertyData.COMMUNITY
    console.log('v', v)
    const distributionData = await firebase.doFirestoreDocGet(distributionType, v)
    console.log('distributionData', distributionData)
    return distributionData
  }

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
          <Container style={{ maxWidth: '750px'  }}>
            <Row>
              <div className="compareFirstSectionRow">
                <Col xs={12} style={{  }}>
                  <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                  <p style={{ marginLeft: '14px' }}>{property1.PROP_ADD}, {property1.PROP_CITY}, {property1.PROP_STATE} {property1.PROP_ZIP}</p>
                  <img style={{ position: 'relative', marginTop: '-30px', width: '190px' }} src={MFS_Logo} />
                  <img style={{ position: 'relative', marginTop: '-30px', width: '40px' }} src={Blue_House} />
                </Col>
                <Col style={{ position: 'absolute', alignSelf: 'flex-end', bottom: '100px' }}>
                  <FloodScoreGauge MFS={property1.MFS} index={0}/>
                </Col>
              </div>
              <div style={{ borderLeft: '1px solid black', height: '350px' }} />
              <div className="compareFirstSectionRow">
                <Col xs={12} style={{ }}>
                  <p className="bold" style={{ marginBottom: '0rem' }}>Property Address:</p>
                  <p style={{ marginLeft: '14px' }}>{property2.PROP_ADD}, {property2.PROP_CITY}, {property2.PROP_STATE} {property2.PROP_ZIP}</p>
                  <img style={{ position: 'relative', marginTop: '-30px', width: '190px' }} src={MFS_Logo} />
                  <img style={{ position: 'relative', marginTop: '-30px', width: '40px' }} src={Green_House} />
                </Col>
                <Col style={{ position: 'absolute', alignSelf: 'flex-end', bottom: '100px' }}>
                    <FloodScoreGauge MFS={property2.MFS} index={1}/>
                </Col>
              </div>
            </Row>
          </Container>
        </div>
        <div className="reportSection learMore" style={{ background: 'transparent', boxShadow: 'none' }}> { /* Section Two */ }
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 105px' }}>Review of Key Flood Influencers</span>
            <Container style={{ marginTop: '15px', textAlign: 'left', maxWidth: '750px' }}>
              <Row style={{ marginTop: '27px' }}>
                <Col>
                  {keyFloodInfluencers.map((riksLevelObj, index) => {
                    return <KeyInfluencer key={index} property={property1} riksLevelObj={riksLevelObj} />
                  })}
                </Col>
                <div style={{ marginLeft: '-13px', borderLeft: '1px solid black', height: '315px' }} /> {/* divider line */}
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
          <div style={{ textAlign: 'center', marginTop: '-100px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 55px' }}>My Flood Score comparison between both properties</span>
            <Container style={{ marginTop: '15px', textAlign: 'left', maxWidth: '700px' }}>
              <Row style={{ marginTop: '27px' }}>
                <Col style={{ marginTop: '-35px', left: '-25px' }}>
                  <ComparisonChart distributionData={distributionData1} />
                  <MFSRangeImg />
                </Col>
                <div style={{ marginLeft: '-13px', borderLeft: '1px solid black', height: '250px' }} />
                <Col style={{ marginTop: '-35px', left: '-25px' }}>
                  <ComparisonChart distributionData={distributionData2} />
                  <MFSRangeImg />
                </Col>
              </Row>
            </Container>
          </div>
        </div>

        <div className="reportSection" style={{ padding: '20px', background: 'transparent', boxShadow: 'none' }} > { /* Section Four */ }
          <div style={{ textAlign: 'center', marginTop: '-80px' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'black', backgroundColor: '#f2f2f2', padding: '8px 105px' }}>Additional Floodplain Information</span>
            <div style={{ marginTop: '30px' }} />
            <AddFloodplainInfo left={`Zone ${property1.FEMA_ZONE.split(',')[0]}`} middle="FEMA Flood Zone" right={`Zone ${property2.FEMA_ZONE.split(',')[0]}`} />
            <AddFloodplainInfo left={(getFEMARiskLevel(property1)) === 'pos' ? 'No' : 'Yes'} middle="Flood Insurance" right={(getFEMARiskLevel(property2)) === 'pos' ? 'No' : 'Yes'} />
            <AddFloodplainInfo left={getLOMARecommendation(property1)} middle="LOMA Recommendation" right={getLOMARecommendation(property2)} />
          </div>
        </div>

        <div className="reportSection" style={{ padding: '20px', background: 'transparent', boxShadow: 'none' }} > { /* Section Five */ }
          <div style={{ textAlign: 'center', marginTop: '-55px' }}>
            <Container style={{ marginTop: '15px', textAlign: 'left', maxWidth: '700px' }}>
              <Row style={{ marginTop: '27px' }}>
                <Col style={{ marginTop: '10px' }}>
                  The Best Available floodplain information <span className="bold">{getGenerallyAgrees(property1)}</span> with the effective FEMA data for this property
                </Col>
                <div style={{ marginLeft: '-13px', borderLeft: '1px solid black', height: '84px' }} />
                <Col style={{ marginTop: '10px' }}>
                  The Best Available floodplain information <span className="bold">{getGenerallyAgrees(property2)}</span> with the effective FEMA data for this property
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
