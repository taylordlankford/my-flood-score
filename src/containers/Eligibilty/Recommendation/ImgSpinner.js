import React from "react"
import Spinner from "react-bootstrap/Spinner"
import "./styles.css"

const ImgSpinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-container">
        <Spinner animation="border" role="status" size="lg" id="img-spinner">
          <span className="sr-only">Retrieving your image.</span>
        </Spinner>
      </div>
    </div>
  )
}

export default ImgSpinner;