import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { FaChevronUp } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import './FaqStyles.css'
import * as FAQ_DATA from './FaqData'

export default function Faq() {
  const [faqlist, setFaqlist] = useState([
    {
      expanded: false,
      title: 'Can I terminate my Flood Insurance Policy?',
      content: FAQ_DATA.data_one
    },
    {
      expanded: false,
      title: 'How long will the process take?',
      content: FAQ_DATA.data_two
    },
    {
      expanded: false,
      title: 'Is it Possible that FEMA will reject my LOMA request?',
      content: FAQ_DATA.data_three
    },
  ])

  const handleClick = id => {
    switch (id) {
      case 0:
        setFaqlist([
          {
            expanded: !faqlist[id].expanded,
            title: 'Can I terminate my Flood Insurance Policy?',
            content: FAQ_DATA.data_one
          },
          {
            expanded: false,
            title: 'How long will the process take?',
            content: FAQ_DATA.data_two
          },
          {
            expanded: false,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
            content: FAQ_DATA.data_three
          }
        ])
        break;
      case 1:
        setFaqlist([
          {
            expanded: false,
            title: 'Can I terminate my Flood Insurance Policy?',
            content: FAQ_DATA.data_one
          },
          {
            expanded: !faqlist[id].expanded,
            title: 'How long will the process take?',
            content: FAQ_DATA.data_two
          },
          {
            expanded: false,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
            content: FAQ_DATA.data_three
          }
        ])
        break;
      case 2:
        setFaqlist([
          {
            expanded: false,
            title: 'Can I terminate my Flood Insurance Policy?',
            content: FAQ_DATA.data_one
          },
          {
            expanded: false,
            title: 'How long will the process take?',
            content: FAQ_DATA.data_two
          },
          {
            expanded: !faqlist[id].expanded,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
            content: FAQ_DATA.data_three
          }
        ])
        break;
    }
  }

  return (
    <div style={{ paddingTop: '30px' }}>
      {
        faqlist.map((element, key) => {
          return (
            <Accordion key={key}>
              <Accordion.Toggle as={Card.Header} eventKey={key} onClick={() => { handleClick(key) }}>
                { /* Change font color based on if accordion is expanded or collapsed */
                  element.expanded ?
                    <Row>
                      <Col style={{ color: '#55B96A' }} className="faq-title">
                        {element.title}
                      </Col>
                      <Col lg={2} style={{ color: '#55B96A' }} className="faq-body">
                        <FaChevronUp />
                      </Col>
                    </Row>
                    :
                    <Row>
                      <Col style={{ color: '#666666' }} className="faq-title">
                        {element.title}
                      </Col>
                      <Col lg={2} style={{ color: '#666666' }} className="faq-body">
                        <FaChevronDown />
                      </Col>
                    </Row>
                }
              </Accordion.Toggle>
              {
                element.expanded ?
                  <Card.Body style={{ textAlign: 'left' }}>{element.content}</Card.Body> : <div style={{ display: 'none' }} />
              }
            </Accordion>
          );
        })
      }
    </div>
  )
}
