import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Section2, Div2, H2 } from '../../components/Options/StyledComponents'

import Card from '../../components/Options/Card'
import * as data from '../Options/OptionsData'

const ReduceOptions = () => (
  <Section2 id="e">
    <Div2>
      <H2>
        <strong>REDUCE or ELIMINATE </strong>- LOMA
      </H2>
      <hr />
      <Container style={{ marginTop: '2.8rem' }}>
        <Row>
          <Col
            style={{
              padding: '0'
            }}
          >
            <Card detailsList={data.detailsList11} styles={data.styles11} />
          </Col>
        </Row>
      </Container>
    </Div2>
  </Section2>
)

export default ReduceOptions
