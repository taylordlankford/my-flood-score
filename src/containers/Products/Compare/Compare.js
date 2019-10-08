import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../Products.css'
import { Button, TopSection } from '../StyledComponents'
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal'

import sampleComparePDF1 from '../../../assets/pdfs/sample-snapshot-double-compare.pdf'
import sampleComparePDF2 from '../../../assets/pdfs/sample-snapshot-single-compare.pdf'
import sampleCompare from '../../../assets/images/sample-snapshot.jpg'
import SecondRow from '../../Header/SecondRow'
import * as ROUTES from '../../../constants/routes'

import CompareOptions from '../../Options/CompareOptions'

const Compare = ({ history }) => {
  const [modalShow1, setModalShow1] = React.useState(false)
  const [modalShow2, setModalShow2] = React.useState(false)
  return (
    <>
      <SecondRow />
      <TopSection>Compare</TopSection>
      <Container>
        <Row>
          <Col sm={6} className="body-text">
            <p><span className="bold">My Flood Snapshot</span> allows you to compare a property’s score with that of other properties within the same location, as well as being able to take a closer look at the flood zones around a property.</p>
            <p>
              The Flood Snapshot will provide advice and recommendations if appropriate.
            </p>
            <p>Take a closer look at the examples to the right.</p>
          </Col>
          <Col sm={6}>
              <Row>
                <img onClick={() => setModalShow1(true)} src={sampleCompare} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto' }} />
                <img onClick={() => setModalShow2(true)} src={sampleCompare} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto' }} />
              </Row>
            <MyVerticallyCenteredModal
              show={modalShow1}
              onHide={() => setModalShow1(false)}
              samplePDF={sampleComparePDF1}
            />
            <MyVerticallyCenteredModal
              show={modalShow2}
              onHide={() => setModalShow2(false)}
              samplePDF={sampleComparePDF2}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f4f4f4', marginTop: '30px', textAlign: 'center' }}>
        <CompareOptions />
        <Button onClick={() => history.push(ROUTES.OPTIONS)} variant="primary">CHECK ALL REPORTS AND ACCOUNT OPTIONS</Button>
      </div>
    </>
  )
}

export default Compare
