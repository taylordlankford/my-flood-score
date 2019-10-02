import React from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../Products.css'

import SecondRow from '../../Header/SecondRow'
import Card from '../../../components/Options/Card'
import * as data from '../../Options/OptionsData'

const Discover = () => {
  return (
    <>
      <SecondRow />
      <TopSection>Discover</TopSection>
      <Container>
        <Row>
          <Col sm={9} className="body-text">
            <p>Discover a property’s <span className="bold">Flood Score</span>.</p>
            <p>
              <span className="bold">My Flood Score</span> is the result of analyzing the <span className="bold">best available flood data</span>, combined with details of the property structure and land parcel, as well as a number of other significant flood factors even down to how the local community is responding to the risk of a flood.
            </p>
            <p>Take a closer look at the example to the right.</p>
          </Col>
          <Col sm={3}>
            Download sample copy
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: '#f4f4f4' }}>
        <Section2 id="a">
          <Div>
            <H2>
              <strong>DISCOVER</strong> - My Flood Score
            </H2>
            <hr />
            <Container style={{ marginTop: '2.8rem' }}>
              <Row>
                <Col
                  style={{
                    padding: '0'
                  }}
                >
                  <Card detailsList={data.detailsList1} styles={data.styles1} />
                </Col>
                <Col
                  style={{
                    padding: '0'
                  }}
                >
                  <Card detailsList={data.detailsList2} styles={data.styles2} />
                </Col>
                <Col
                  style={{
                    padding: '0'
                  }}
                >
                  <Card detailsList={data.detailsList3} styles={data.styles3} />
                </Col>
              </Row>
            </Container>
          </Div>
        </Section2>
      </div>
    </>
  )
}

const TopSection = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #ebebeb;
  background-color: #0d238e;
  text-align: center;
  padding: 2rem;
`;

const Section2 = styled.section`
	text-align: center;
	padding: 4rem 0;

	@media (max-width: 1030px) {
		padding: 2.5rem 0;
	}

	@media (max-width: 600px) {
		padding: 1.5rem 0;
	}
`;

const Div = styled.div`
	/* style={{ width: '75%', display: 'inline-block' }} */
	width: 75%;
	display: inline-block;

	@media (max-width: 600px) {
		width: 85%;
	}
`;

const H2 = styled.h2`
	color: #0d238e;
	font-size: 2.1rem;
	line-height: 1.4;
	font-weight: 700;
	letter-spacing: 0em;
	margin-bottom: 1.6rem;

	@media (max-width: 770px) {
		font-size: 1.6rem;
	}
`;

export default Discover
