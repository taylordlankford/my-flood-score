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

    if (faqlist[id].expanded === false) {
      /* Clicking on differnet accordion expands it, while hides the rest */
      prevFaqlist.map((element, key) => {
        element.expanded = false
      })
      prevFaqlist[id].expanded = !prevFaqlist[id].expanded
      setFaqlist([...prevFaqlist])
    } else {
      /* Clicking on same accordion sets everything back to its false aka collapsed. */
      prevFaqlist.map((element, key) => {
        element.expanded = false
      })

      setFaqlist([...prevFaqlist])
    }
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
