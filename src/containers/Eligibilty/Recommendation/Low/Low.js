import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
// import { FaCheck } from "react-icons/fa";
import * as S from "../StyledComponents";
import ExamineSvg from "../../../../assets/images/Examine.svg";
import CategoryPills from "../CategoryPills";
// import styled from "styled-components";
import InfoBox from "./InfoBox";
import LearnMore from "./LearnMore";
import RecommendationFooter from "../RecommendationFooter";
// import BasisOfDetermination from "../../BasisOfDetermination/BasisOfDetermination";

const Low = props => {
  const { LOMARating, LOMACategory, selectedAddress, propertyData } = props;

  return (
    <div>
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
              LOMARating={LOMARating}
              selectedAddress={selectedAddress}
              propertyData={propertyData}
              suggestion="Low" />

          </S.ResultsContainer>
          <hr
            style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
          />
        </Col>
        <Col sm={6} style={{ border: "1px solid #C7AE4A" }}>
          <LearnMore
            title="Flood Analysis Memo"
            text="Learn more about your detailed flood risk. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={ExamineSvg}
          />
        </Col>
      </Row>
      <RecommendationFooter />
    </div>
  );
};




export default Low;
