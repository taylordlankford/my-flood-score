import React from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

/**
 * InfoBox
 */
const InfoBox = (props) => {
  const {
    LOMARating,
    selectedAddress,
    propertyData,
    suggestion,
    basisOfDetermination
  } = props

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
            <span style={{ fontWeight: "500" }}>FEMA considers this property to be in a low risk flood zone.</span>
          </div>
          <div>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>The elevation of your property appears to be below the flood elevation.</span>
          </div>
          <div>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>The elevation of your property appears to be <b style={{ color: "#fff" }}>slightly</b> below the flood elevation, <b style={{ color: "#fff" }}>an Elevation Certificate can confirm this.</b></span>
          </div>
        </BasisContainer>
      </div>
    </InfoBoxWrapper>
  );
};

export default InfoBox;

const InfoBoxWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: grid;
  grid-gap: 20px;
`;

const BasisContainer = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`