import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const InfoBox = ({ selectedAddress, propertyData, suggestion }) => {
  return (
    <InfoBoxWrapper>
      {console.log('PROPERTY DATA => ', propertyData)}
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
          FEMA Flood Zone
        </span>
        <span style={{ fontWeight: "500" }}>
          {propertyData.FEMA_ZONE}
          {/*propertyData.FEMA_ZONE.stringValue.slice(0, 2).slice(0, -1)*/}
        </span>
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          Likelihood you are wrongly mapped:
        </span>
        <span style={{ fontWeight: "500" }}>{suggestion}</span>
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px" }}>
          Basis of this determination:
        </span>
      </div>
      <BasisOfDetermination>
        <div>
          <FaCheck />
          <span style={{ fontWeight: "500" }}>
            FEMA considers this property to be in a high risk flood zone.
          </span>
        </div>
        <div>
          <FaCheck />
          <span style={{ fontWeight: "500" }}>
            The elevation of your property appears to be <i>above</i> the flood
            elevation.
          </span>
        </div>
      </BasisOfDetermination>
    </InfoBoxWrapper>
  );
};

const InfoBoxWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: grid;
  grid-gap: 20px;
`;

const BasisOfDetermination = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`

export default InfoBox;
