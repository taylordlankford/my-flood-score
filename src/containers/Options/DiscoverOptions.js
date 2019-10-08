import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Section2, Div, H2 } from '../../components/Options/StyledComponents'

import Card from '../../components/Options/Card'
import * as data from '../Options/OptionsData'

const DiscoverOptions = () => (
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
)

export default DiscoverOptions
