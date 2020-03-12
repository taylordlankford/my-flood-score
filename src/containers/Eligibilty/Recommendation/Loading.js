import React from "react"
import Spinner from "react-bootstrap/Spinner"
import "./styles.css"

const Loading = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-container">
        <Spinner animation="border" role="status" size="lg" id="recommendation-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}

export default Loading;