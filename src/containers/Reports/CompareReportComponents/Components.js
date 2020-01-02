import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MFS_Logo from '../../../assets/images/MFS_Logo.png'

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

export const MFSRangeImg = () => (
  <div style={{ marginTop: '-70px', marginBottom: '30px', marginLeft: '30px', textAlign: 'center' }}>
    <img style={{ position: 'relative', marginTop: '-8px', marginRight: '5px', width: '190px' }} src={MFS_Logo} />
    <span className="bold" style={{ fontSize: '19px' }}>Range</span>
  </div>
)

