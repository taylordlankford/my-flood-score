import React, { useState } from "react";
import * as S from "./StyledComponents";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import ExamineSvg from "../../../assets/images/Examine.svg";
// import { FaCheck, FaCentercode } from "react-icons/fa";
// import {
//   PrimaryBtn,
//   TransitionBtn
// } from "../../../StyledComponents/StyledComponents";
import CategoryPills from "./CategoryPills";
import InfoBox from "./InfoBox";
import ImgLightbox from "./ImgLightbox";

const Medium = (props) => {
  const {
    getLOMARecommendation,
    LOMARating,
    LOMACategory,
    femaZone,
    selectedAddress,
    propertyData,
    imgUrl
  } = props

  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <ImgLightbox
        imgUrl={imgUrl}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <MediumWrapper>
        <div style={{ paddingBottom: "40px" }}>
          <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
            CONGRATULATIONS! This property has a “medium” likelihood of
            benefiting from a Letter of Map Amendment.
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
          <Col lg={6}>
            {imgUrl ? (
              <div style={{ paddingTop: "14px" }}>
                <img
                  src={imgUrl}
                  style={{ cursor: "pointer", height: "100%", width: "100%" }}
                  onClick={() => setModalShow(true)}
                />
              </div>
            ) : (
              <>Pending...</>
            )}
          </Col>
          {/*
          <LearnMoreBox
            title="Flood Analysis Memo"
            text="Learn more about your detailed flood risk. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={ExamineSvg}
          />
          */}
        </Row>
        <Row lg={12}>
          <Col lg={6}>
            <div style={{ textAlign: "center", marginTop: "60px" }}>
              <a
                href="https://www.nofloodflorida.com/orderloma/"
                rel="noopener noreferrer"
                target="_top"
              >
                <Button>Finalize LOMA Request</Button>
              </a>
            </div>
          </Col>
          <Col lg={6}></Col>
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
            <a
              href="https://www.nofloodflorida.com/loma/"
              rel="noopener noreferrer"
              target="_top"
            >
              LOMA
            </a>
          </u>{" "}
          page or <span style={{ color: "#000" }}>Call 813-213-0641</span>
        </div>
      </MediumWrapper>
    </>
  );
}

/*
const InfoBox = ({ selectedAddress, propertyData }) => {
  return (
    <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
      <ul style={{ listStyleType: "none" }}>
        <li style={{ marginBottom: "20px" }}><FaCheck />PROPERTY ADDRESS: {selectedAddress}</li>
        <li style={{ marginBottom: "20px" }}><FaCheck />FEMA FLOOD ZONE: {propertyData.FEMA_ZONE.stringValue.slice(0, 2)}</li>
        <li style={{ marginBottom: "20px" }}><FaCheck />LIKELIHOOD YOU ARE WRONGLY MAPPED: MEDIUM</li>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />BASIS OF THIS DETERMINATION:
          <ul style={{ listStyleType: "none", fontWeight: "400" }}>
            <li><FaCheck />FEMA considers this property to be in a medium risk flood zone.</li>
            <li><FaCheck />The elevation of your property appears to be <i>above</i> the flood elevation.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
*/

/*
const LearnMoreBox = ({ title, text, img }) => {
  return (
    <Row lg={12} style={{ paddingTop: '20px' }}>
      <Col lg={8}>
        <div>
          <h4 style={{ color: "#fff" }}>
            {title}
          </h4>
          <div style={{ paddingBottom: '45px' }}>
            <p>
              {text}
            </p>
          </div>
        </div>
      </Col>
      <Col lg={4}>
        <div style={{ textAlign: 'center', paddingBottom: '30px' }}>
          <img src={img} style={{ height: '120px', width: '120px' }} />
        </div>
        <a href="https://www.nofloodflorida.com/orderloma/" rel="noopener noreferrer" target="_blank">
          <PrimaryBtn>
            Learn More
          </PrimaryBtn>
        </a>
      </Col>
    </Row>
  )
}
*/

const MediumWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5em;
`

export default Medium