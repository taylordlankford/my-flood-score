import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../Products.css'
import { Button, TopSection } from '../StyledComponents'
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal'

import sampleExaminePDF from '../../../assets/pdfs/sample-Analysis.pdf'
import sampleExamine from '../../../assets/images/sample-analysis.jpg'
import SecondRow from '../../Header/SecondRow'
import * as ROUTES from '../../../constants/routes'

import ExamineOptions from '../../Options/ExamineOptions'

const Examine = ({ history }) => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <SecondRow />
      <TopSection>Examine</TopSection>
      <Container>
        <Row>
          <Col sm={9} className="body-text">
            <p><span className="bold">My Flood Analysis Memo</span> allows you to examine in detail the entire flood risk of a property. This report looks in detail at the risk to the property structure, land parcel and analyses the flood plains around the property.</p>
            <p>
            Furthermore, it provides an estimate of the premium that is likely for your property using a <span className="bold">Flood Insurance Estimator</span>.
            </p>
            <p>Take a closer look at the example to the right.</p>
          </Col>
          <Col sm={3}>
            <img onClick={() => setModalShow(true)} src={sampleExamine} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto' }} />

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              samplePDF={sampleExaminePDF}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f4f4f4', marginTop: '30px', textAlign: 'center' }}>
        <ExamineOptions />
        <Button onClick={() => history.push(ROUTES.OPTIONS)} variant="primary">CHECK ALL REPORTS AND ACCOUNT OPTIONS</Button>
      </div>
    </>
  )
}

export default Examine
