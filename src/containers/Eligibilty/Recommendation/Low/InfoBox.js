import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

import ContactUsForm from '../../../Eligibilty/ContactUsForm'

/**
 * InfoBox
 */
const InfoBox = (props) => {
  const {
    LOMARating,
    selectedAddress,
    propertyData,
    suggestion,
  } = props
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <InfoBoxWrapper>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          Property Address:
        </span>
        <span style={{ fontWeight: "500" }}>{selectedAddress}</span>
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          FEMA Flood Zone:
        </span>
        <span style={{ fontWeight: "500" }}>
          {propertyData.FEMA_ZONE}
          {/*propertyData.FEMA_ZONE.stringValue.slice(0, 2).slice(0, -1)*/}
        </span>
      </div>
      <div>
        <div style={{ fontWeight: "700", fontSize: "18px", paddingBottom: "6px" }}>
          <FaCheck />
          <span>Basis of this determination:</span>
        </div>
        <BasisContainer>
          <div>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>FEMA considers this property to be in a <B>high risk flood zone</B>.</span>
          </div>
          <div>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>
              The elevation of your property appears to be <B>very close</B> to the
              floodplain elevation, <B>an Elevation Certificate will be required
              to determine if you are eligible for the LOMA. Already have an
              Elevation Certificate, <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setShowContactModal(true)}>Contact Us</span> and we will review it for
              free!</B>
            </span>
          </div>
        </BasisContainer>
      </div>
      <ContactUsForm show={showContactModal} handleClose={() => setShowContactModal(false)} />
    </InfoBoxWrapper>
  );
};

export default InfoBox;

const B = styled.b`
  font-weight: 600;
  color: #fff;
`

const InfoBoxWrapper = styled.div`
  padding: 20px 0 20px 40px;
  display: grid;
  grid-gap: 20px;
`;

const BasisContainer = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`