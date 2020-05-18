import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
import * as S from "../StyledComponents";
import ExamineSvg from "../../../../assets/images/Examine.svg";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
// import InfoBox from "../InfoBox";
import LearnMore from "./LearnMore";
import RecommendationFooter from "../RecommendationFooter";

const NotApplicableLowRisk = ({ selectedAddress, propertyData }) => {
  return (
    <div>
      <div style={{ paddingBottom: "40px" }}>
        <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
          It is not recommended to pursue a Letter of Map Amendmend for this property.
        </h3>
      </div>
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col sm={6}>
          <hr
            style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
          />
          <S.ResultsContainer>
            <div style={{ margin: "0 auto", textAlign: "center", fontSize: "18px", maxWidth: "100%" }}>
              <p>A Letter of Map Amendment is not applicable for this property.</p>
            </div>
            <InfoBoxWrapper>
              <div>
                <FaCheck />
                <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>Property Address:</span>
                <span style={{ fontWeight: "500" }}>{selectedAddress}</span>
              </div>
              <div>
                <FaCheck />
                <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>FEMA Flood Zone:</span>
                <span style={{ fontWeight: "500" }}>
                  {propertyData.FEMA_ZONE}
                </span>
              </div>
              <div>
                <FaCheck />
                <span style={{ fontWeight: "500", marginRight: "20px" }}>
                  FEMA considers this property to be in a low risk flood zone, an area of minimal flooding.
                </span>
              </div>
              <div>
                <FaCheck />
                <span style={{ fontWeight: "500", marginRight: "20px" }}>
                  Flood insurance for this property would most likely <b style={{ fontWeight: "600", color: "#fff" }}>NOT</b> be required.
                </span>
              </div>
            </InfoBoxWrapper>
          </S.ResultsContainer>
          <hr style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }} />
        </Col>
        <Col sm={6}>
          <LearnMore
            title="Flood Analysis Memo"
            img={ExamineSvg}
          />
        </Col>
      </Row>
      <div style={{ paddingTop: "20px" }}>
        <RecommendationFooter />
      </div>
    </div>
  );
}

export default NotApplicableLowRisk;

const InfoBoxWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: grid;
  grid-gap: 20px;
`;