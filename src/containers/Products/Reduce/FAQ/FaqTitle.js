import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import './FaqStyles.css'

export default function FaqTitle(props) {
  return(
    <div>
      { /* Change font color based on if accordion is expanded or collapsed */
        props.isFaqExpanded ?
          <Row>
            <Col style={{ color: '#55B96A' }} className="faq-title">
              {props.faqTitle}
            </Col>
            <Col lg={2} style={{ color: '#55B96A' }} className="faq-svg">
              <FaChevronUp />
            </Col>
          </Row>
          :
          <Row>
            <Col style={{ color: '#666666' }} className="faq-title">
              {props.faqTitle}
            </Col>
            <Col lg={2} style={{ color: '#666666' }} className="faq-svg">
              <FaChevronDown />
            </Col>
          </Row>
      }
    </div>
  )
}
