import React from "react"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const LearnMore = ({ title, text, disclaimer, img }) => {
  return (
    <>
      {/* Elevation Certificate */}
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col lg={8}>
          <div>
            <h4 style={{ color: "#fff" }}>Elevation Certificate</h4>
            <div style={{ paddingBottom: "45px" }}>
              <p style={{ fontWeight: "400" }}>
                An Elevation Certificate is used to define key elevations
                around your property and can confirm your eligibility for a
                Letter of Map Amendment (LOMA). If you do not have an
                Elevation Certificate, No Flood Florida can help you obtain
                one through one of our Survey partners. An Elevation
                Certificate can further define floodplain impacts and flood
                insurance premiums.
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
      {/* Want to Know More About your Property’s Flood Risk? */}
      <Row lg={12} style={{ paddingTop: "20px" }}>
        <Col lg={8}>
          <div>
            <h4 style={{ color: "#fff" }}>Want to Know More About your Property’s Flood Risk?</h4>
            <div style={{ paddingBottom: "45px" }}>
              <p style={{ fontWeight: "400" }}>
                Learn more about your detailed flood risk, floodplain maps, building and structure impacts, and flood insurance premium estimates. Order your customized <b style={{ color: "#fff" }}>Flood Analysis Memo</b> today!
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
    </>
  );
};

export default LearnMore