import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import FaqTitle from './FaqTitle'
import './FaqStyles.css'
import * as FAQ_DATA from './FaqData'

export default function Faq() {
  const [faqlist, setFaqlist] = useState([
    {
      open: true,
      title: 'Can I terminate my Flood Insurance Policy?',
      content: FAQ_DATA.data_one
    },
    {
      open: true,
      title: 'How long will the process take?',
      content: FAQ_DATA.data_two
    },
    {
      open: true,
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
             open: !faqlist[0].open,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: true,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: true,
             title: 'Is it Possible that FEMA will reject my LOMA request?',
             content: FAQ_DATA.data_three
           }
         ])
         break;
       case 1:
         setFaqlist([
           {
             open: true,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: !faqlist[1].open,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: true,
             title: 'Is it Possible that FEMA will reject my LOMA request?',
             content: FAQ_DATA.data_three
           }
         ])
         break;
       case 2:
         setFaqlist([
           {
             open: true,
             title: 'Can I terminate my Flood Insurance Policy?',
             content: FAQ_DATA.data_one
           },
           {
             open: true,
             title: 'How long will the process take?',
             content: FAQ_DATA.data_two
           },
           {
             open: !faqlist[2].open,
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
        faqlist.map((index, key) => {
          return (
            <div key={key}>
              <Accordion>
                <Accordion.Toggle as={Card.Header} eventKey={key} onClick={() => { handleClick(key) }}>
                  {
                    index.open ?
                      <FaqTitle
                        style={{ color: '#666666' }}
                        faqTitle={index.title}
                        faqOpen={index.open}
                      />
                      :
                      <FaqTitle
                        style={{ color: '#55B96A' }}
                        faqTitle={index.title}
                        faqOpen={index.open}
                      />
                  }
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={key}>
                  <Card.Body>
                    {
                      index.open ? <p></p> : <p style={{ textAlign: 'left' }}>{index.content}</p>
                    }
                  </Card.Body>
                </Accordion.Collapse>
              </Accordion>
            </div>
          )
        })
      }
    </div>
    )
}