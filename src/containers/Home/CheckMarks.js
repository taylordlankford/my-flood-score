import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { FaCheck } from 'react-icons/fa'

const Column = ({title, description}) => (
  <Col style={{ padding: '15px 20px' }}>
    <FaCheck
      color="#55b96a"
      size={36}
      style={{ margin: '0 auto', display: 'block' }}
    />
    <h2 style={{ textAlign: 'center', color: '#0D238E', padding: '0.6em 0', fontWeight: 'bold', fontSize: '24px' }}>{title}</h2>
    <p style={{ color: '#666666', display: 'block', margin: '0 auto', textAlign: 'center' }}>{description}</p>
  </Col>
)

const CheckMarks = () => {
  return (
    <Container style={{ width: '70%' }}>
      <Row>
        <Column
          title="LOWER PREMIUMS"
          description="For 1000’s of homeowners our Flood Score could help to reduce or even eliminate flood premiums."
        />
        <Column
          title="KNOW AND COMPARE"
          description="Compare your property to understand the risk relative to other properties around you and get advice on reducing your risk."
        />
        <Column
          title="EARLY INDICATIONS"
          description="Our Flood Score intelligence provides early indications of flood zone changes, which may affect your premium."
        />
      </Row>
    </Container>
  )
}

export default CheckMarks