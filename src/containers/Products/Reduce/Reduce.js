import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
// import { FaChevronUp } from 'react-icons/fa';

import '../Products.css'
import { Button, TopSection } from '../StyledComponents'
import sampleReduce from '../../../assets/images/Reduce_Eliminate.svg'
import SecondRow from '../../Header/SecondRow'
import * as ROUTES from '../../../constants/routes'

import ReduceOptions from '../../Options/ReduceOptions'

const Reduce = ({ history }) => {
  return (
    <>
      <SecondRow />
      <TopSection>Reduce Or Eliminate</TopSection>
      <Container>
        <Row>
          <Col sm={8} style={{ marginTop: '15px', textAlign: 'left' }} className="body-text" >
            <p>….your flood premium through a <span className="bold">Letter of Map Amendment (LOMA).</span></p>
            <br />
            <p>
              <span className="bold">We will determine and inform you if our analysis indicates that your property has been wrongly identified as being in the High Risk Flood Zone,</span> a Letter of Map Amendment (LOMA) is
              FEMA’s official method to correct your flood zone designation.
            </p>
            <br />
            <p>
              <span className="bold">We will submit a LOMA on your behalf!</span> It will require an Elevation Certificate (EC) from a Professional Surveyor to be submitted with your request. The EC will have the elevation of your structure as well as the flood zone’s Base Flood Elevation (BFE).
            </p>
          </Col>
          <Col sm={4}>
            <img src={sampleReduce} style={{ cursor: 'pointer', position: 'relative', margin: '60px auto', width: '200px' }} />
          </Col>
        </Row>
      </Container>

      <div style={{ backgroundColor: '#f4f4f4', marginTop: '30px', textAlign: 'center' }}>
        <Container>
          <Row>
            <Col sm={9}>
              <ReduceOptions />
              <Button onClick={() => history.push(ROUTES.OPTIONS)} variant="primary">CHECK ALL REPORTS AND ACCOUNT OPTIONS</Button>
            </Col>
            <Col sm={3} style={{ marginTop: '150px' }}>
              <p style={{ color: '#0d238e', fontSize: '2.1rem', lineHeight: '1.4', fontWeight: '700' }}>FAQ</p>
              <hr />
              <Accordion />
              {/* <Accordion defaultActiveKey="0" >
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <div className="w-tabs-section-header-h">
                      <h5 className="w-tabs-section-title">Can I terminate my Flood Insurance Policy? {eventKey === 0 ? <FaChevronUp /> : <FaChevronUp /> }</h5>
                    </div>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Click me!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion> */}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Reduce

const paragraph = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus sint provident vel ab reprehenderit cum soluta, suscipit facere nisi sed earum repellendus fuga debitis, nam molestiae minima voluptates possimus.'

const data = [
  {
    title: 'Can I terminate my Flood Insurance Policy?',
    paragraph: "We are all for helping its clients save money. Going through the LOMA process will allow FEMA and ultimately flood insurance companies to have a better understanding of the flood risk your property faces. If you decide to keep flood insurance, you can expect a significant reduction in your premium. Your mortgage lender may also drop your flood insurance requirement all together. However, you should learn more about your flood risk before making such decision. We will guide you by providing a FREE Flood Analysis Memo with your LOMA order."
  },
  {
    title: 'How long will the process take?',
    paragraph: "How Once you submit a request for us to handle your LOMA process, we will contact you to coordinate a time for a surveyor to come and survey your property. We then use the Elevation Certificate from the Surveyor to submit your LOMA application to FEMA and provide you with FEMA’s reply. Depending on the situation, this entire process may take as little as 1 week or as long as 60 days. When you submit your request, No Flood Florida will give you your expected time and keep you updated along the way."
  },
  {
    title: 'Is it Possible that FEMA will reject my LOMA request?',
    paragraph: "We screen every request prior to beginning the process. Each property is ranked as either having a low, medium, or high likelihood of receiving a LOMA from FEMA. We will recommend the medium and high likelihood properties to move forward. We will also work with clients who received a low likelihood designation to submit their request. If through our screening process we find that you are almost certainly not going to be able to get a LOMA, we will notify you. But you can rest assured because our service has a money back guarantee!"
  },
]

class Accordion extends React.Component {
  render () {
    return (
      <div {...{ className: 'wrapper' }}>
        <ul {...{ className: 'accordion-list' }}>
          {data.map((data, key) => {
            return (
              <li {...{ className: 'accordion-list__item', key }}>
                <AccordionItem {...data} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  }
  
  render () {
    const {
      props: {
        paragraph,
        title
      },
      state: {
        opened
      }
    } = this
    
    return (
      <div
        {...{
          className: `accordion-item, ${opened && 'accordion-item--opened'}`,
          onClick: () => { this.setState({ opened: !opened }) }
        }}
      >
        <div {...{ className: 'accordion-item__line' }}>
          <h3 {...{ className: 'accordion-item__title' }}>
            {title}
          </h3>
          <span {...{ className: 'accordion-item__icon' }}/>
        </div>
          <div {...{ className: 'accordion-item__inner' }}>
            <div {...{ className: 'accordion-item__content' }}>
              <p {...{ className: 'accordion-item__paragraph' }}>
                {paragraph}
              </p>
            </div>
          </div>
      </div>
    )
  }
}
