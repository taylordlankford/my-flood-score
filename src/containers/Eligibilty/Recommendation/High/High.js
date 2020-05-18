import React, { useState } from "react";
import { ResultsContainer } from "../StyledComponents";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryPills from "../CategoryPills";
import InfoBox from "./InfoBox";
import ImgLightbox from "../ImgLightbox";
import RecommendationFooter from "../RecommendationFooter";
import FloodRiskMap from "../FloodRiskMap";
import BottomMenu from "../BottomMenu/BottomMenu";

const High = props => {
  const {
    LOMARating,
    selectedAddress,
    propertyData,
    imgUrl
  } = props;

  const [modalShow, setModalShow] = useState(false);
  const [basisOfDetermination] = useState([
    {
      id: 1,
      info: "FEMA considers this property to be in a high risk flood zone."
    },
    {
      id: 2,
      info: "The elevation of your property appears to be above the flood elevation."
    }
  ])

  return (
    <>
      <ImgLightbox
        imgUrl={imgUrl}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <HighWrapper>
        <div style={{ paddingBottom: "40px" }}>
          <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
            CONGRATULATIONS! <br />This property has a “High” likelihood of benefiting
            from a Letter of Map Amendment.
          </h3>
        </div>
        <Row lg={12}>
          <Col lg={6}>
            <hr
              style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
            />
            <ResultsContainer>
              <CategoryPills LOMARating={LOMARating} />
              <InfoBox
                LOMARating={LOMARating}
                selectedAddress={selectedAddress}
                propertyData={propertyData}
                suggestion="High"
                basisOfDetermination={basisOfDetermination}
              />
            </ResultsContainer>
            <hr
              style={{ margin: "0", padding: "0", border: "3px solid #C7AE4A" }}
            />
          </Col>
          <Col lg={6}>
            <FloodRiskMap imgUrl={imgUrl} setModalShow={setModalShow} />
          </Col>
        </Row>
        <BottomMenu />
        <RecommendationFooter />
      </HighWrapper>
    </>
  );
};

const HighWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5em;
`;

export default High;