import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../Products.css'
import { Button, TopSection } from '../StyledComponents'
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal'

import sampleCertifyPDF from '../../../assets/pdfs/sample-certificate.pdf'
import sampleCertify from '../../../assets/images/sample-certificate.jpg'
import SecondRow from '../../Header/SecondRow'
import * as ROUTES from '../../../constants/routes'

import CertifyOptions from '../../Options/CertifyOptions'

const Certify = ({ history }) => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <SecondRow />
      <TopSection>Certify</TopSection>
      <Container>
        <Row>
          <Col sm={9} className="body-text">
            <p><span className="bold">My Flood Safe Certificate</span> is <span className="bold">certified</span> by our <span className="bold">Professional
              <br />Water Resource Engineers</span>.</p>
            <p>
              The certificate is proof of your property’s Flood Risk and a valuable tool if questions are ever asked about by potential buyers or Realtors.
            </p>
            <p>Take a closer look at the example to the right.</p>
          </Col>
          <Col sm={3}>
            <img onClick={() => setModalShow(true)} src={sampleCertify} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto' }} />

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              samplePDF={sampleCertifyPDF}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f4f4f4', marginTop: '30px', textAlign: 'center' }}>
        <CertifyOptions />
        <Button onClick={() => history.push(ROUTES.OPTIONS)} variant="primary">CHECK ALL REPORTS AND ACCOUNT OPTIONS</Button>
      </div>
    </>
  )
}

export default Certify
