import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ResultsContainer } from "./StyledComponents";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CategoryPills from "./CategoryPills";
import InfoBox from "./InfoBox";
import ImgLightbox from "./ImgLightbox";
import RecommendationFooter from "./RecommendationFooter";
import FloodRiskMap from "./FloodRiskMap";

const High = props => {
  const {
    LOMARating,
    LOMACategory,
    femaZone,
    selectedAddress,
    propertyData,
    imgUrl
  } = props;

  const [modalShow, setModalShow] = useState(false);
  const [basisOfDetermination, setBasisOfDetermination] = useState([
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
            CONGRATULATIONS! This property has a “High” likelihood of benefiting
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
        <Row lg={12} style={{ paddingTop: "40px" }}>
          <Col lg={6}>
            <div style={{ textAlign: "center" }}>
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
