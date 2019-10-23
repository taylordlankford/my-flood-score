import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import FaqTitle from './FaqTitle'
import './FaqStyles.css'
import * as FAQ_DATA from './FaqData'

export default function Faq() {
  const [faqlist, setFaqlist] = useState([
    {
      open: false,
      title: 'Can I terminate my Flood Insurance Policy?',
      content: FAQ_DATA.data_one
    },
    {
      open: false,
      title: 'How long will the process take?',
      content: FAQ_DATA.data_two
    },
    {
      open: false,
      title: 'Is it Possible that FEMA will reject my LOMA request?',
      content: FAQ_DATA.data_three
    },
  ])

  const handleClick = (id) => {
    // faqlist.map((idx, key) => {
    //   if (id === key) {
    //     console.log(faqlist[id].open)
    //     setFaqlist([
    //       {
    //         open: !faqlist[id].open
    //       }
    //     ])
    //   }
    // })

     switch (id) {
       case 0:
         setFaqlist([
           {
             open: !faqlist[id].open,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: false,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: false,
             title: 'Is it Possible that FEMA will reject my LOMA request?',
             content: FAQ_DATA.data_three
           }
         ])
         break;
       case 1:
         setFaqlist([
           {
             open: false,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: !faqlist[id].open,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: false,
             title: 'Is it Possible that FEMA will reject my LOMA request?',
             content: FAQ_DATA.data_three
           }
         ])
         break;
       case 2:
         setFaqlist([
           {
             open: false,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: false,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: !faqlist[id].open,
             title: 'Is it Possible that FEMA will reject my LOMA request?',
             content: FAQ_DATA.data_three
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
            <div key={key}>
              <Accordion>
                <Accordion.Toggle as={Card.Header} eventKey={key} onClick={() => { handleClick(key) }}>
                  { /* Change font color based on if accordion is expanded or collapsed */
                    element.open ?
                      <FaqTitle
                        style={{ color: '#55B96A' }}
                        faqTitle={element.title}
                        faqOpen={element.open}
                      />
                      :
                      <FaqTitle
                        style={{ color: '#666666' }}
                        faqTitle={element.title}
                        faqOpen={element.open}
                      />

                  }
                </Accordion.Toggle>
                {
                  element.open ?
                    <Card.Body style={{ textAlign: 'left' }}>{element.content}</Card.Body>
                    :
                      <Card.Body style={{ display: 'none' }}>{element.content}</Card.Body>
                }
              </Accordion>
            </div>
          )
        })
      }
    </div>
    )
}
