import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const InfoBox = ({ selectedAddress, propertyData }) => {
  return (
    <InfoBoxWrapper>
      <div>
        <FaCheck />
        PROPERTY ADDRESS: {selectedAddress}
      </div>
      <div>
        <FaCheck />
        FEMA FLOOD ZONE: {propertyData.FEMA_ZONE.stringValue.slice(0, 2)}
      </div>
      <div>
        <FaCheck />
        LIKELIHOOD YOU ARE WRONGLY MAPPED: HIGH
      </div>
      <div>
        <FaCheck />
        BASIS OF THIS DETERMINATION:
      </div>
      <BasisOfDetermination>
        <div>
          <FaCheck />
          FEMA considers this property to be in a high risk flood zone.
        </div>
        <div>
          <FaCheck />
          The elevation of your property appears to be <i>above</i> the flood
          elevation.
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
