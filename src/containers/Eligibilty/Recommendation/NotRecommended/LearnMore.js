import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SurveyIncentiveIcon from "../../../../assets/images/surveyincentive01.svg";

const LearnMore = ({ title, disclaimer, img }) => {
  return (
    <>
      <Row sm={12} style={{ paddingTop: "20px" }}>
        <Col sm={8}>
          <div>
            <h4 style={{ color: "#fff" }}>{title}</h4>
            <div>
              <p style={{ fontWeight: "500" }}>
                Good News! This property is identified as being in the low-risk
                flood zone according to FEMA data. Therefore, there is no need
                to pursue a Letter of Map Amendment. FEMA data does not always
                show the full picture and properties in this low risk flood
                zone have flooded in the past. In fact, more than 20 percent of
                flood claims come from properties outside the high-risk flood
                zone. Get a <b style={{ color: "#fff" }}>Flood Analysis Memo</b> to learn the full flood risk of
                this property.
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
          <div style={{ paddingTop: "40px" }}>
            <h4 style={{ color: "#fff" }}>Elevation Certificate</h4>
            <div>
              <p style={{ fontWeight: "500" }}>
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
          {/* <div style={{ textAlign: "center", height: "100px", width: "100px" }}></div> */}
          <div style={{ textAlign: "center" }}>
            <img src={SurveyIncentiveIcon} style={{ height: "200px", width: "200px" }}/>
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

export default LearnMore;