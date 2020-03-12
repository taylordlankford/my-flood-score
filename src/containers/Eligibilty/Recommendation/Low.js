import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { FaCheck } from "react-icons/fa";
import * as S from "./StyledComponents";
import ExamineSvg from "../../../assets/images/Examine.svg";
import CategoryPills from "./CategoryPills";
import InfoBox from "./InfoBox";
import RecommendationFooter from "./RecommendationFooter";

const Low = props => {
  const { LOMARating, LOMACategory, selectedAddress, propertyData } = props;
  const [basisOfDetermination, setBasisOfDetermination] = useState([
    {
      id: 1,
      info: "FEMA considers this property to be in a high risk flood zone."
    },
    {
      id: 2,
      info: "The elevation of your property appears to be below the flood elevation."
    }
  ])

  return (
    <>
      <div style={{ paddingBottom: "40px" }}>
        <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
          This property has a “low” likelihood of benefiting from a Letter of
          Map Amendment.
        </h3>
      </div>
      <Row sm={12}>
        <Col sm={6}>
          <hr
            style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
          />
          <S.ResultsContainer>
            <CategoryPills LOMARating={LOMARating} />
            <InfoBox
              selectedAddress={selectedAddress}
              propertyData={propertyData}
              suggestion="Low"
              basisOfDetermination={basisOfDetermination}
            />
          </S.ResultsContainer>
          <hr
            style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
          />
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
    </>
  );
};

/*
const InfoBox = ({ selectedAddress, propertyData }) => {
  return (
    <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
      <ul style={{ listStyleType: "none" }}>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />
          PROPERTY ADDRESS: {selectedAddress}
        </li>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />
          FEMA FLOOD ZONE: {propertyData.FEMA_ZONE.stringValue.slice(0, 2)}
        </li>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />
          LIKELIHOOD YOU ARE WRONGLY MAPPED: LOW
        </li>
        <li style={{ marginBottom: "20px" }}>
          <FaCheck />
          BASIS OF THIS DETERMINATION:
          <ul style={{ listStyleType: "none", fontWeight: "400" }}>
            <li>
              <FaCheck />
              FEMA considers this property to be in a low risk flood zone.
            </li>
            <li>
              <FaCheck />
              The elevation of your property appears to be <i>below</i> the
              flood elevation.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
*/

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
              href=" https://www.nofloodflorida.com/fam/"
              rel="noopener noreferrer"
              target="_top"
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
              href="https://www.nofloodflorida.com/loma/"
              rel="noopener noreferrer"
              target="_top"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>Learn More</Button>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Low;
