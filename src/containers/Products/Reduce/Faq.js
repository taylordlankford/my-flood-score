import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
// import { Button } from '../StyledComponents'

import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

// export default function Faq() {
export default class Faq extends Component {
  constructor(props) {
    super(props)

    this.state = {
      faq_one: {
        open: true,
        id: 0,
        title: 'Can I terminate my Flood Insurance Policy?',
      },
      faq_two: {
        open: true,
        id: 1,
        title: 'How long will the process take?',
      },
      faq_three: {
        open: true,
        id: 2,
        title: 'Is it Possible that FEMA will reject my LOMA request?',
      },
    }
  }

  handleClick(id) {
    let isOpen = null

    switch (id) {
      case 0:
        this.setState({
          faq_one: {
            open: !this.state.faq_one.open,
            id: 0,
            title: 'Can I terminate my Flood Insurance Policy?',
          },
          faq_two: {
            open: true,
            id: 1,
            title: 'How long will the process take?',
          },
          faq_three: {
            open: true,
            id: 2,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
          }
        })
        break;
      case 1:
        this.setState({
          faq_one: {
            open: true,
            id: 0,
            title: 'Can I terminate my Flood Insurance Policy?',
          },
          faq_two: {
            open: !this.state.faq_two.open,
            id: 1,
            title: 'How long will the process take?',
          },
          faq_three: {
            open: true,
            id: 2,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
          }
        })
        break;
      case 2:
        this.setState({
          faq_one: {
            open: true,
            id: 0,
            title: 'Can I terminate my Flood Insurance Policy?',
          },
          faq_two: {
            open: true,
            id: 1,
            title: 'How long will the process take?',
          },
          faq_three: {
            open: !this.state.faq_three.open,
            id: 2,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
          }
        })
        break;
    }
    console.log(this.state.faq_one.open)
  }

  render() {
    return (
      <div>
        <Accordion style={{width: '100%'}}>
          <Accordion.Toggle as={Card.Header} eventKey="0" onClick={e => { this.handleClick(0) }}>
            <Row>
              <Col>
                <p style={{fontWeight: 'bold'}}>{this.state.faq_one.title}</p>
              </Col>
              <Col lg={2} style={{padding: '0'}}>
                {this.state.faq_one.open ? <FaChevronDown /> : <FaChevronUp />}
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {/*{this.state.faq_one.paragraph} */}
              {
                this.state.faq_one.open ?
                  <p></p>
                  :
                  <p style={{textAlign: 'left'}}>
                    We are all for helping its clients save money. Going through the LOMA process
                    will allow FEMA and ultimately flood insurance companies to have a better
                    understanding of the flood risk your property faces. If you decide to keep
                    flood insurance, you can expect a significant reduction in your premium. Your
                    mortgage lender may also drop your flood insurance requirement all together.
                    However, you should learn more about your flood risk before making such
                    decision. We will guide you by providing a FREE Flood Analysis Memo with your
                    LOMA order.</p>
              }
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="1" onClick={e => { this.handleClick(1) }}>
            <Row>
              <Col>
                <p style={{fontWeight: 'bold'}}>{this.state.faq_two.title}</p>
              </Col>
              <Col lg={2} style={{padding: '0'}}>
                {this.state.faq_two.open ? <FaChevronDown /> : <FaChevronUp />}
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {/* {this.state.faq_two.paragraph} */}
              {
                this.state.faq_two.open ?
                  <p></p>
                  :
                  <p style={{textAlign: 'left'}}>
                    How Once you submit a request for us to handle your LOMA process, we will contact you to coordinate a time for a surveyor to come and survey your property. We then use the Elevation Certificate from the Surveyor to submit your LOMA application to FEMA and provide you with FEMA’s reply. Depending on the situation, this entire process may take as little as 1 week or as long as 60 days. When you submit your request, No Flood Florida will give you your expected time and keep you updated along the way. </p>
              }
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Toggle as={Card.Header} eventKey="2" onClick={e => { this.handleClick(2) }}>
            <Row>
              <Col>
                <p style={{fontWeight: 'bold'}}>{this.state.faq_three.title}</p>
              </Col>
              <Col lg={2} style={{padding: '0'}}>
                {this.state.faq_three.open ? <FaChevronDown /> : <FaChevronUp />}
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {/*{this.state.faq_three.paragraph}*/}
              {
                this.state.faq_three.open ?
                  <p></p>
                  :
                  <p style={{textAlign: 'left'}}>We screen every request prior to beginning the process. Each property is ranked as either having a low, medium, or high likelihood of receiving a LOMA from FEMA. We will recommend the medium and high likelihood properties to move forward. We will also work with clients who received a low likelihood designation to submit their request. If through our screening process we find that you are almost certainly not going to be able to get a LOMA, we will notify you. But you can rest assured because our service has a money back guarantee!</p>
              }
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </div>
    )
  }
}
