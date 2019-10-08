import React from 'react'
import Modal from 'react-bootstrap/Modal'

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ height: '5px', borderBottom: '0' }} closeButton>
      </Modal.Header>
      <Modal.Body>
      <iframe src={props.samplePDF} width="100%" height="500px" />
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal
