import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import './FaqStyles.css'

export default function FaqTitle(props) {
  return(
    <Row>
      <Col style={props.style} className="faq-title">
        {props.faqTitle}
      </Col>
      <Col lg={2} style={props.style} className="faq-body">
        { props.faqExpanded ? <FaChevronUp /> : <FaChevronDown /> }
      </Col>
    </Row>
  )
}
