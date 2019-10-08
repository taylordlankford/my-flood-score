import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Section2, Div, H2 } from '../../components/Options/StyledComponents'

import Card from '../../components/Options/Card'
import * as data from '../Options/OptionsData'

const CompareOptions = () => (
  <Section2 id="b">
    <Div>
      <H2>
        <strong>COMPARE</strong> - My Flood Snapshop
      </H2>
      <hr />
      <Container style={{ marginTop: '2.8rem' }}>
        <Row>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList4} styles={data.styles4} />
          </Col>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList5} styles={data.styles5} />
          </Col>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList6} styles={data.styles6} />
          </Col>
        </Row>
      </Container>
    </Div>
  </Section2>
)

export default CompareOptions
