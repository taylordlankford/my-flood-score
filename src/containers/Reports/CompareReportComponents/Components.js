import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export const AddFloodplainInfo = ({left, middle, right}) => (
  <Container>
    <Row style={{ marginTop: '12px' }}>
      <Col className="AdditinalInfoBoxes" style={{ background: '#C5E0B4' }}>
        {left}
      </Col>
      <Col className="AdditinalInfoBoxes" style={{ height: '49px', marginTop: '-5px', background: '#DAE3F3', fontWeight: 'bold' }}>
        {middle}
      </Col>
      <Col className="AdditinalInfoBoxes" style={{ background: '#F8CBAD' }}>
        {right}
      </Col>
    </Row>
  </Container>
)
