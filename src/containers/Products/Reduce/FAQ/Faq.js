import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './FaqStyles.css'
import * as FAQ_DATA from './FaqData'
import FaqTitle from './FaqTitle'
import FaqBody from './FaqBody'

export default function Faq() {
  const [faqlist, setFaqlist] = useState([
    {
      expanded: false,
      title: FAQ_DATA.title_one,
      content: FAQ_DATA.content_body_one
    },
    {
      expanded: false,
      title: FAQ_DATA.title_two,
      content: FAQ_DATA.content_body_two
    },
    {
      expanded: false,
      title: FAQ_DATA.title_three,
      content: FAQ_DATA.content_body_three
    },
  ])

  const handleClick = id => {
    switch (id) {
      case 0:
        setFaqlist([
          {
            expanded: !faqlist[id].expanded,
            title: FAQ_DATA.title_one,
            content: FAQ_DATA.content_body_one
          },
          {
            expanded: false,
            title: FAQ_DATA.title_two,
            content: FAQ_DATA.content_body_two
          },
          {
            expanded: false,
            title: FAQ_DATA.title_three,
            content: FAQ_DATA.content_body_three
          }
        ])
        break;
      case 1:
        setFaqlist([
          {
            expanded: false,
            title: FAQ_DATA.title_one,
            content: FAQ_DATA.content_body_one
          },
          {
            expanded: !faqlist[id].expanded,
            title: FAQ_DATA.title_two,
            content: FAQ_DATA.content_body_two
          },
          {
            expanded: false,
            title: FAQ_DATA.title_three,
            content: FAQ_DATA.content_body_three
          }
        ])
        break;
      case 2:
        setFaqlist([
          {
            expanded: false,
            title: FAQ_DATA.title_one,
            content: FAQ_DATA.content_body_one
          },
          {
            expanded: false,
            title: FAQ_DATA.title_two,
            content: FAQ_DATA.content_body_two
          },
          {
            expanded: !faqlist[id].expanded,
            title: FAQ_DATA.title_three,
            content: FAQ_DATA.content_body_three
          }
        ])
        break;
    }
  }

  return (
    <div className="faq-container">
      {
        faqlist.map((element, key) => {
          return (
            <Accordion key={key} >
              <Accordion.Toggle
                as={Card.Header}
                eventKey={key}
                onClick={() => { handleClick(key) }}>
                <FaqTitle
                  faqTitle={element.title}
                  isFaqExpanded={element.expanded} />
              </Accordion.Toggle>
              <FaqBody
                isFaqExpanded={element.expanded}
                faqContent={element.content} />
            </Accordion>
          );
        })
      }
    </div>
  )
}
