import React, { useState } from "react";
import * as S from "./StyledComponents";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CategoryPills from "./CategoryPills";
import InfoBox from "./InfoBox";
import ImgLightbox from "./ImgLightbox";
import RecommendationFooter from "./RecommendationFooter";

const Medium = props => {
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
      id: 0,
      info: "FEMA considers this property to be in a medium risk flood zone."
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
      <MediumWrapper>
        <div style={{ paddingBottom: "40px" }}>
          <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
            CONGRATULATIONS! This property has a “medium” likelihood of
            benefiting from a Letter of Map Amendment.
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
                suggestion="Medium"
                basisOfDetermination={basisOfDetermination}
              />
            </S.ResultsContainer>
            <hr
              style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
            />
          </Col>
          <Col lg={6}>
            {imgUrl ? (
              <S.ImgContainer>
                <img
                  src={imgUrl}
                  style={{ cursor: "pointer", height: "100%", width: "100%" }}
                  onClick={() => setModalShow(true)}
                />
              </S.ImgContainer>
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
      </MediumWrapper>
    </>
  );
};

const MediumWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5em;
`;

export default Medium;
