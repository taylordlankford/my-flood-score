import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './FaqStyles.css'
import * as FAQ_DATA from './FaqData'
import FaqTitle from './FaqTitle'
import FaqBody from './FaqBody'

export default function Faq() {
  const [faqlist, setFaqlist] = useState(FAQ_DATA.FAQ_LIST)

  const handleClick = id => {
    const prevFaqlist = faqlist
    prevFaqlist[id].expanded = !prevFaqlist[id].expanded
    setFaqlist([...prevFaqlist])
  }

  return (
    <div className="faq-container">
      {
        faqlist.map((element, key) => {
          return (
            <Accordion key={key} >
              <Accordion.Toggle
                className="accordion-toggle"
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
