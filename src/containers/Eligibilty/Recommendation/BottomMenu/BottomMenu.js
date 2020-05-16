import React from "react";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchAnotherPropertyBtn from "./SearchAnotherPropertyBtn.js"
import FinalizeLomaBtn from "./FinalizeLomaBtn.js"

const BottomMenu = () => {
  return (
    <Row lg={12}>
      <Col lg={6}>
        <FinalizeLomaBtn />
      </Col>
      <Col lg={6}>
        <SearchAnotherPropertyBtn />
      </Col>
    </Row>
  )
}

export default BottomMenu;