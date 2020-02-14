import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import CategoryPills from "./CategoryPills";
import InfoBox from "./InfoBox";
import ImgLightbox from "./ImgLightbox";
import RecommendationFooter from "./RecommendationFooter"

const High = (props) => {
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
      <HighWrapper>
        <div style={{ paddingBottom: "40px" }}>
          <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
            CONGRATULATIONS! This property has a “High” likelihood of benefiting
            from a Letter of Map Amendment.
          </h3>
        </div>
        <Row lg={12}>
          <Col lg={6}>
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
              <div style={{ paddingTop: "30px" }}>
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
}

const HighWrapper = styled.div`
  font-size: 16px;
  line-height: 1.5em;
`

export default High