import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import '../Products.css'
import { Button, TopSection } from '../StyledComponents'
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal'

import sampleDiscoverPDF from '../../../assets/pdfs/sample-discovery.pdf'
import sampleDiscover from '../../../assets/images/sample-discover.jpg'
import SecondRow from '../../Header/SecondRow'
import * as ROUTES from '../../../constants/routes'

import DiscoverOptions from '../../Options/DiscoverOptions'

const Discover = ({ history }) => {
  const [modalShow, setModalShow] = React.useState(false)
  return (
    <>
      <SecondRow />
      <TopSection>Discover</TopSection>
      <Container>
        <Row>
          <Col sm={9} className="body-text">
            <p>Discover a property’s <span className="bold">Flood Score</span>.</p>
            <p>
              <span className="bold">My Flood Score</span> is the result of analyzing the <span className="bold">best available flood data</span>, combined with details of the property structure and land parcel, as well as a number of other significant flood factors even down to how the local community is responding to the risk of a flood.
            </p>
            <p>Take a closer look at the example to the right.</p>
          </Col>
          <Col sm={3}>
            <img onClick={() => setModalShow(true)} src={sampleDiscover} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto' }} />

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              samplePDF={sampleDiscoverPDF}
            />
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f4f4f4', marginTop: '30px', textAlign: 'center' }}>
        <DiscoverOptions />
        <Button onClick={() => history.push(ROUTES.OPTIONS)} variant="primary">CHECK ALL REPORTS AND ACCOUNT OPTIONS</Button>
      </div>
    </>
  )
}

export default Discover
