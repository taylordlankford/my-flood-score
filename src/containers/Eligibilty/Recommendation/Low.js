import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { FaCheck } from 'react-icons/fa'
import * as S from './StyledComponents'
import ExamineSvg from '../../../assets/images/Examine.svg'
import CategoryPills from './CategoryPills'

const Low = (props) => {
  const {
    getLOMARecommendation,
    LOMARating,
    LOMACategory,
    selectedAddress,
    propertyData
  } = props

  return (
    <>
      <div style={{ paddingBottom: "40px" }}>
        <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
          This property has a “low” likelihood of benefiting from a Letter of Map Amendment.
        </h3>
      </div>
      <Row sm={12}>
        <Col sm={6}>
          <hr style={{ border: "3px solid #C7AE4A", marginBottom: "40px" }} />
          <CategoryPills
            getLOMARecommendation={getLOMARecommendation}
            LOMARating={LOMARating}
          />
          <InfoBox
            selectedAddress={selectedAddress}
            propertyData={propertyData}
          />
          <hr style={{ border: "3px solid #C7AE4A" }} />
        </Col>
        <Col sm={6} style={{ border: "1px solid #C7AE4A" }}>
          <LearnMoreBox
            title="Flood Analysis Memo"
            text="Learn more about your detailed flood risk. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={ExamineSvg}
          />
        </Col>
      </Row>
      <div
        style={{
          fontSize: "20px",
          backgroundColor: "#C7AE4A",
          color: "#fff",
          marginTop: "60px",
          padding: "2px 40px 2px 40px",
          textAlign: "center"
        }}
      >
        Learn more about the LOMA by visiting our{" "}
        <u>
          <a href="#">LOMA</a>
        </u>{" "}
        page or <span style={{ color: "#000" }}>Call 1-800-LOMA-NFF</span>
      </div>
    </>
  );
}

const InfoBox = ({ selectedAddress, propertyData }) => {
  return (
    <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
      <ul style={{ listStyleType: "none" }}>
        <li style={{ marginBottom: "20px" }}><FaCheck />PROPERTY ADDRESS: {selectedAddress}</li>
        <li style={{ marginBottom: "20px" }}><FaCheck />FEMA FLOOD ZONE: {propertyData.FEMA_ZONE.stringValue.slice(0, 2)}</li>
        <li style={{ marginBottom: "20px" }}><FaCheck />LIKELIHOOD YOU ARE WRONGLY MAPPED: LOW</li>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />BASIS OF THIS DETERMINATION:
          <ul style={{ listStyleType: "none", fontWeight: "400" }}>
            <li><FaCheck />FEMA considers this property to be in a low risk flood zone.</li>
            <li><FaCheck />The elevation of your property appears to be <i>below</i> the flood elevation.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}

/*
const ZoneBox = ({ LOMACategory, femaZone }) => {
  return (
    <Row sm={12}>
      <Col sm={6}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', marginBottom: '10px' }}>
          <div style={{ border: '1px solid #666666', padding: '10px 20px 10px 20px', backgroundColor: '#d0d8f5' }}>
            Flood Risk
          </div>
          <div style={{ backgroundColor: '#9FE6A7', height: '38px', marginTop: '2px', border: '1px solid #666666', borderLeft: 'none', padding: '10px 10px 10px 10px', textAlign: 'center' }}>
            {LOMACategory === 'N/A' ? 'Low' : 'Low'}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
          <div style={{ border: '1px solid #666666', padding: '10px 20px 10px 20px', backgroundColor: '#d0d8f5' }}>
            FEMA Flood Zone
          </div>
          <div style={{ backgroundColor: '#9FE6A7', height: '38px', marginTop: '2px', border: '1px solid #666666', borderLeft: 'none', padding: '10px 10px 10px 10px', textAlign: 'center' }}>
            {femaZone.slice(0, 1)}
          </div>
        </div>
      </Col>
      <Col sm={6}>
        <p>
          Located in a FEMA low-risk flood zone, <b>Zone X</b>, an area of minimal
          flooding. Flooding is unlikely in the 100-year rainfall event. Flood
          insurance for this property would most likely <b>NOT</b> be required.
        </p>
      </Col>
    </Row>
  )
} */

const LearnMoreBox = ({ title, text, disclaimer, img }) => {
  return (
    <>
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col lg={8}>
          <div>
            <h4 style={{ color: "#fff" }}>{title}</h4>
            <div style={{ paddingBottom: "45px" }}>
              <p>{text}</p>
            </div>
            <div>
              <p>
                <em style={{ fontWeight: 500 }}>{disclaimer}</em>
              </p>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div style={{ textAlign: "center", paddingBottom: "30px" }}>
            <img src={img} style={{ height: "100px", width: "100px" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.nofloodflorida.com/orderloma/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>Learn More</Button>
            </a>
          </div>
        </Col>
      </Row>
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col lg={8}>
          <div>
            <h4 style={{ color: "#fff" }}>Elevation Certificate</h4>
            <div style={{ paddingBottom: "45px" }}>
              <p>
                Elevation Certificate An Elevation Certificate is used to define
                key elevations around your property. If you do not already have
                one, No Flood Florida can help you obtain an Elevation
                Certificate from a Survey partner. We will also evaluate
                completed Certificates to determine 100% accurate LOMA
                eligibility.
              </p>
            </div>
            <div>
              <p>
                <em style={{ fontWeight: 500 }}>{disclaimer}</em>
              </p>
            </div>
          </div>
        </Col>
        <Col lg={4}>
          <div style={{ textAlign: "center", paddingTop: "70px" }}>
            <a
              href="https://www.nofloodflorida.com/orderloma/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>Learn More</Button>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Low