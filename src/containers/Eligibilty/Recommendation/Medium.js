import React from 'react'
import * as S from './StyledComponents'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Medium = () => {
  return (
    <S.LOMABody>
      <b>Property Address:</b>
      <br />
      <b>
        This property is located within the FEMA high-risk floodplain but may
        be improperly mapped!
      </b>
      <p>
        An Elevation Certificate is used to define key elevations around your
        property. No Flood Florida can help you obtain an Elevation Certificate
        from a Survey partner. We will also evaluate completed Certificates to
        determine 100% accurate LOMA eligibility.
      </p>
      <b>
        Flood Analysis Memo 
      </b>
      <p>
        Learn more about your detailed flood risk.
        Floodplain maps, building and structure impacts, and flood insurance
        premium estimates
      </p>
    </S.LOMABody>
  )
}

export default Medium