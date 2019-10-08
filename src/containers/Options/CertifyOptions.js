import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Section2, Div2, H2 } from '../../components/Options/StyledComponents'

import Card from '../../components/Options/Card'
import * as data from '../Options/OptionsData'

const CertifyOptions = () => (
  <Section2 id="d">
    <Div2>
      <H2>
        <strong>CERTIFY</strong> - My Flood Safe
      </H2>
      <hr />
      <Container style={{ marginTop: '2.8rem' }}>
        <Row>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList9} styles={data.styles9} />
          </Col>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList10} styles={data.styles10} />
          </Col>
        </Row>
      </Container>
    </Div2>
  </Section2>
)

export default CertifyOptions
