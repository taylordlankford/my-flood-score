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
      <Accordion>
        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => { handleClick(0) }}>
          {
            faqlist[0].open ?
              <FaqTitle
                style={{ color: '#666666' }}
                faqTitle={faqlist[0].title}
                faqOpen={faqlist[0].open}
              />
            :
              <FaqTitle
                style={{ color: '#55B96A' }}
                faqTitle={faqlist[0].title}
                faqOpen={faqlist[0].open}
              />
          }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {
              faqlist[0].open ?
                <p></p>
                :
                  <p style={{textAlign: 'left'}}>
                    {faqlist[0].content}
                </p>
            }
          </Card.Body>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="1" onClick={() => { handleClick(1) }}>
          {
            faqlist[1].open ?
              <FaqTitle
                style={{ color: '#666666' }}
                faqTitle={faqlist[1].title}
                faqOpen={faqlist[1].open}
              />
            :
              <FaqTitle
                style={{ color: '#55B96A' }}
                faqTitle={faqlist[1].title}
                faqOpen={faqlist[1].open}
              />
          }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {
              faqlist[1].open ?
                <p></p>
                :
                  <p style={{textAlign: 'left'}}>
                    {faqlist[1].content}
                  </p>
            }
          </Card.Body>
        </Accordion.Collapse>
        <Accordion.Toggle as={Card.Header} eventKey="2" onClick={() => { handleClick(2) }}>
          {
            faqlist[2].open ?
              <FaqTitle
                style={{ color: '#666666' }}
                faqTitle={faqlist[2].title}
                faqOpen={faqlist[2].open}
              />
            :
              <FaqTitle
                style={{ color: '#55B96A' }}
                faqTitle={faqlist[2].title}
                faqOpen={faqlist[2].open}
              />
          }
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="2">
          <Card.Body>
            {
              faqlist[2].open ?
                <p></p>
                :
                  <p style={{textAlign: 'left'}}>
                    {faqlist[2].content}
                  </p>
            }
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </div>
    )
}


