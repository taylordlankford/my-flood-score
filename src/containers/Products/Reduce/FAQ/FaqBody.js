import React from 'react'
import Card from 'react-bootstrap/Card'

export default function FaqBody(props) {
  return (
    props.isFaqExpanded ?
      <Card.Body className="faq-body">
        {props.faqContent}
      </Card.Body>
      :
      <div style={{ display: 'none' }}></div>
  )
}
