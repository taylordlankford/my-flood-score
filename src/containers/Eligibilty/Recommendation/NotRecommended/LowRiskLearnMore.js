import React from "react";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import SearchAnotherPropertyBtn from "../BottomMenu/SearchAnotherPropertyBtn";

const LowRiskLearnMore = ({ title, disclaimer, img }) => {
  return (
    <>
      <Row sm={12}>
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
                flood claims come from properties <B>outside the high-risk flood
                zone</B>. Get a <B>Flood Analysis Memo</B> to learn the full flood risk of
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
            <img src={img} style={{ height: "120px", width: "100px" }} />
          </div>
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
          <div style={{ textAlign: "center", marginTop: "10px" }}>
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
      <br />
      <SearchAnotherPropertyBtn />
    </>
  );
};

export default LowRiskLearnMore;

const B = styled.b`
  font-weight: 600;
  color: #fff;
`