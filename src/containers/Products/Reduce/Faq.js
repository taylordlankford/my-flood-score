import React, { useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import FaqTitle from './FaqTitle'
import './FaqStyles.css'

export default function Faq() {
  const [faqlist, setFaqlist] = useState([
    {
      open: true,
      title: 'Can I terminate my Flood Insurance Policy?',
    },
    {
      open: true,
      title: 'How long will the process take?',
    },
    {
      open: true,
      title: 'Is it Possible that FEMA will reject my LOMA request?',
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
          },
          {
            open: true,
            title: 'How long will the process take?',
          },
          {
            open: true,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
          }
        ])
        break;
      case 1:
        setFaqlist([
          {
            open: true,
            title: 'Can I terminate my Flood Insurance Policy?',
          },
          {
            open: !faqlist[1].open,
            title: 'How long will the process take?',
          },
          {
            open: true,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
          }
        ])
        break;
      case 2:
        setFaqlist([
          {
            open: true,
            title: 'Can I terminate my Flood Insurance Policy?',
          },
          {
            open: true,
            title: 'How long will the process take?',
          },
          {
            open: !faqlist[2].open,
            title: 'Is it Possible that FEMA will reject my LOMA request?',
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
                    We are all for helping its clients save money. Going through the LOMA process
                    will allow FEMA and ultimately flood insurance companies to have a better
                    understanding of the flood risk your property faces. <b>If you decide to keep
                    flood insurance, you can expect a significant reduction in your premium. Your
                    mortgage lender may also drop your flood insurance requirement all together.</b>
                    However, you should learn more about your flood risk before making such
                    decision. We will guide you by providing a <b>FREE Flood Analysis Memo</b> with your
                    LOMA order.</p>
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
                    How Once you submit a request for us to handle your LOMA
                    process, we will contact you to coordinate a time for a
                    surveyor to come and survey your property. We then use the
                    Elevation Certificate from the Surveyor to submit your LOMA
                    application to FEMA and provide you with FEMA’s reply.
                    Depending on the situation, this entire process may take as
                    little as 1 week or as long as 60 days. When you submit
                    your request, No Flood Florida will give you your expected
                    time and keep you updated along the way.</p>
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
                  <p style={{textAlign: 'left'}}>We screen every request prior to beginning the process. Each property is ranked as either having a low, medium, or high likelihood of receiving a LOMA from FEMA. We will recommend the medium and high likelihood properties to move forward. We will also work with clients who received a low likelihood designation to submit their request. If through our screening process we find that you are almost certainly not going to be able to get a LOMA, we will notify you. But you can rest assured because our service has a money back guarantee!</p>
            }
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    </div>
    )
}


