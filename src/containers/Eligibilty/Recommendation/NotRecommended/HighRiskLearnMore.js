import React from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SearchAnotherPropertyBtn from "../BottomMenu/SearchAnotherPropertyBtn";
import surveyIncentiveSvg from "../../../../assets/images/surveyincentive01.svg"

const HighRiskLearnMore = ({ disclaimer, img }) => {
  return (
    <>
      <Row sm={12}>
        <Col sm={8}>
          <div>
            <h4 style={{ color: "#fff", fontWeight: "600" }}>Want to Know More About your Property’s Flood Risk?</h4>
            <div>
              <p style={{ fontWeight: "500" }}>
                Learn more about your detailed flood risk, floodplain maps,
                building and structure impacts, and flood insurance premium
                estimates. Order your customized <B>Flood Analysis Memo</B> today!
              </p>
            </div>
            <div>
              <p>
                <em style={{ fontWeight: 500 }}>{disclaimer}</em>
              </p>
            </div>
          </div>
          <Row sm={12}>
            <Col sm={6}>
              <div style={{ textAlign: "center" }}>
                <a
                  href="https://www.nofloodflorida.com/fam/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button style={{ backgroundColor: "#C7AE4A", width: "200px" }}>
                    <span style={{ color: "#fff" }}>Learn More</span>
                  </Button>
                </a>
              </div>
            </Col>
            <Col sm={6}>
              <div style={{ textAlign: "center" }}>
                <a
                  href="https://www.nofloodflorida.com/wp-content/uploads/2020/02/709_Whitehall_St.-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button style={{ backgroundColor: "#C7AE4A", width: "200px" }}>
                    <span style={{ color: "#fff" }}>Sample</span>
                  </Button>
                </a>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm={4}>
          <div style={{ textAlign: "center" }}>
            <img src={img} style={{ height: "120px", width: "100px" }} />
          </div>
        </Col>
      </Row>
      {/* What is an Elevation Certificate? */}
      <Row sm={12} style={{ padding: "0 0 20px 0" }}>
        <Col sm={8}>
          <div style={{ paddingTop: "40px" }}>
            <h4 style={{ color: "#fff", fontWeight: "600" }}>What is an Elevation Certificate?</h4>
            <div>
              <p style={{ fontWeight: "500" }}>
                An Elevation Certificate is used to define key elevations
                around your property. If you do not have an Elevation
                Certificate, No Flood Florida can help you obtain one through
                one of our Survey partners. An Elevation Certificate can
                further define floodplain impacts and flood insurance premiums.
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
          <div style={{ textAlign: "center" }}>
            <img src={surveyIncentiveSvg} style={{ height: "140px", width: "200px" }} />
            <a
              href="https://www.nofloodflorida.com/loma/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button style={{ backgroundColor: "#C7AE4A" }}>
                <span style={{ color: "#fff" }}>Learn More</span>
              </Button>
            </a>
          </div>
        </Col>
      </Row>
      <SearchAnotherPropertyBtn />
    </>
  );
};

export default HighRiskLearnMore;

const B = styled.b`
  font-weight: 600;
  color: #fff;
`