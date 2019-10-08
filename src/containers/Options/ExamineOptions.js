import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Section2, Div2, H2 } from '../../components/Options/StyledComponents'

import Card from '../../components/Options/Card'
import * as data from '../Options/OptionsData'

const ExamineOptions = () => (
  <Section2 id="c">
    <Div2>
      <H2>
        <strong>EXAMINE</strong> - My Flood Analysis Memo
      </H2>
      <hr />
      <Container style={{ marginTop: '2.8rem' }}>
        <Row>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList7} styles={data.styles7} />
          </Col>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList8} styles={data.styles8} />
          </Col>
        </Row>
      </Container>
    </Div2>
  </Section2>
)

export default ExamineOptions
