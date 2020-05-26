import React from 'react'
import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

import { useStateValue, useFirebase } from '../../hooks'

const ContactUsForm = (props) => {
  const firebase = useFirebase()
  const { show, handleClose } = props
  const [{ error }, dispatch] = useStateValue()
  const handleOnSubmit = () => {
    var form = document.getElementById('contact-us-form') // can I get this through a prop?
    var responses = {};
    for( var i = 0; i < form.elements.length - 1; i++ ) { // length - 1 for submit element
      var e = form.elements[i];
      responses[e.name] = e.value
    }

    responses.timestamp = new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})
    const contactFormMessageObj = {
      to: 'info@nofloodflorida.com',
      // to: 'kylekaplan50@gmail.com',
      template: {
        name: 'contactFormTemplate',
        data: {
          ...responses,
        }
      }
    }
    // responses.message = {
    //   text: 'hi',
    //   subject: 'New Contact Form Submission',
    //   html: 'hi',
    // }
    firebase.doFirestoreAdd('contactForm', contactFormMessageObj, handleSuccess)
  }

  const handleSuccess = () => {
    dispatch({
        type: 'changeSuccessMessage',
        newSuccessMessage: 'Message Sent Successfully',
      })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact Us</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="javascript:void(0);" onSubmit={handleOnSubmit} id="contact-us-form">
          <Form.Row>
            <Form.Group as={Col} controlId="billingFirstName">
              <Form.Label>First name *</Form.Label>
              <Form.Control name="firstName" required type="text" placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} controlId="billingLastName">
              <Form.Label>Last name *</Form.Label>
              <Form.Control name="lastName" required type="text" placeholder="Last Name" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="billingEmail">
            <Form.Label>Email address *</Form.Label>
            <Form.Control name="email" required type="email" placeholder="Reply Email" />
          </Form.Group>

          <Form.Group controlId="billingPhone">
            <Form.Label>Phone *</Form.Label>
            <Form.Control name="phone" type="tel" placeholder="Phone Number" required />
          </Form.Group>

          <Form.Group controlId="address1">
            <Form.Label>Address *</Form.Label>
            <Form.Control name="streetAddress1" placeholder="Address" required />
          </Form.Group>

          <Form.Group controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control name="message" as="textarea" rows="3" />
          </Form.Group>

          <input type="submit" id="submit-contact-form" style={{ display: 'none' }} />
        </Form>  
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOnSubmit}>
          Submit
        </Button> */}
        <label htmlFor="submit-contact-form" tabIndex="0" className={"place-order-button add-to-cart-button btn btn-primary btn-primary"} >
          Submit
        </label>
      </Modal.Footer>
    </Modal>
  )
}

export default ContactUsForm
