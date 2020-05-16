import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import * as S from "./StyledComponents";
import ExamineSvg from "../../../assets/images/Examine.svg";
import InfoBox from "./InfoBox";
import RecommendationFooter from "./RecommendationFooter";

const NotRecommended = props => {
  const { LOMARating, LOMACategory, selectedAddress, propertyData } = props;
  const [basisOfDetermination] = useState([
    {
      id: 1,
      info: "FEMA considers this property to be in a low risk flood zone, an area of minimal flooding."
    },
    {
      id: 2,
      info: "Best Available floodplain modeling considers this as a HIGH-RISK property"
    },
    {
      id: 3,
      info: "Flood insurance for this property would most likely NOT be required."
    },
    {
      id: 4,
      info: "There is no benefit to submitting a Letter of Map Amendment."
    }
  ])

  return (
    <div>
      <div style={{ paddingBottom: "40px" }}>
        <h3 style={{ color: "#fff", fontFamily: "Helvetica" }}>
          Congratulations, this property is in a low risk flood zone. It is not recommended to pursue a Letter of Map Amendment for this property
        </h3>
      </div>
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col sm={6}>
          <hr
            style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }}
          />
          <S.ResultsContainer>
            <div style={{ margin: "0 auto", maxWidth: "140px" }}>
              <S.NotRecommendedBlock>Not Recommended</S.NotRecommendedBlock>
            </div>
            <InfoBox
              LOMARating={LOMARating}
              selectedAddress={selectedAddress}
              propertyData={propertyData}
              suggestion="N/A"
              basisOfDetermination={basisOfDetermination}
            />
          </S.ResultsContainer>
          <hr style={{ border: "3px solid #C7AE4A", margin: "0", padding: "0" }} />
        </Col>
        <Col sm={6}>
          <LearnMoreBox
            title="Flood Analysis Memo"
            text="Learn more about your detailed flood risk. Floodplain maps, building and structure impacts, and flood insurance premium estimates"
            img={ExamineSvg}
          />
        </Col>
      </Row>
      <div style={{ paddingTop: "20px" }}>
        <RecommendationFooter />
      </div>
    </div>
  );
};

const LearnMoreBox = ({ title, text, disclaimer, img }) => {
  return (
    <>
      <Row sm={12} style={{ paddingTop: "20px" }}>
        <Col sm={8}>
          <div>
            <h4 style={{ color: "#fff" }}>{title}</h4>
            <div>
              <p>{text}</p>
            </div>
            <div>
              <p>
                <em style={{ fontWeight: 500 }}>{disclaimer}</em>
              </p>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          <div style={{ textAlign: "center" }}>
            <img src={img} style={{ height: "100px", width: "100px" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <a
              href=" https://www.nofloodflorida.com/fam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>
                <span style={{ color: "#000" }}>Learn More</span>
              </Button>
            </a>
          </div>
        </Col>
      </Row>
      <Row sm={12} style={{ paddingTop: "20px" }}>
        <Col sm={8}>
          <div>
            <h4 style={{ color: "#fff" }}>Elevation Certificate</h4>
            <div>
              <p>
                An Elevation Certificate is used to define key elevations around
                your property. If you do not already have one, No Flood Florida
                can help you obtain an Elevation Certificate from a Survey
                partner. We will also evaluate completed Certificates to
                determine 100% accurate LOMA eligibility.
              </p>
            </div>
            <div>
              <p>
                <em style={{ fontWeight: 500 }}>{disclaimer}</em>
              </p>
            </div>
          </div>
        </Col>
        <Col sm={4}>
          {/* Place holder div for future img */}
          <div
            style={{ textAlign: "center", height: "100px", width: "100px" }}
          ></div>
          <div style={{ textAlign: "center" }}>
            <a
              href="https://www.nofloodflorida.com/loma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>
                <span style={{ color: "#000" }}>Learn More</span>
              </Button>
            </a>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default NotRecommended;
