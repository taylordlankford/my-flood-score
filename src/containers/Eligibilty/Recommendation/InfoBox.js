import React from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";
import LikelihoodAnalysis from "./LikelihoodAnalysis/LikelihoodAnalysis.js"
import BasisOfDetermination from "./BasisOfDetermination/BasisOfDetermination"

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
      {/* console.log('PROPERTY DATA => ', propertyData) */}
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
        <FaCheck />
        <LikelihoodAnalysis propertyData={propertyData} LOMARating={LOMARating} suggestion={suggestion} />
        {/*
        <span style={{ fontWeight: "700", fontSize: "18px", marginRight: "20px" }}>
          Likelihood you are wrongly mapped:
        </span>
        <span style={{ fontWeight: "500" }}>
          {suggestion === 'N/A' ? <>Not Recommended</> : <>{suggestion}</> }
        </span>
        */}
      </div>
      <div>
        <FaCheck />
        <span style={{ fontWeight: "700", fontSize: "18px" }}>
          Basis of this determination:
        </span>
      </div>
      <CompareFemaZoneToBaFldZoneS propertyData={propertyData} />
      <BasisOfDetermination basisOfDetermination={basisOfDetermination} />
      {/*
      <StyledBasisOfDetermination>
        {basisOfDetermination.map((item, idx) => (
          <div key={idx}>
            <FaCheck />
            <span style={{ fontWeight: "500" }}>
              {item.info}
            </span>
          </div>
        ))
        }
      </StyledBasisOfDetermination>
      */}
    </InfoBoxWrapper>
  );
};

const CompareFemaZoneToBaFldZoneS = ({ propertyData }) => {
  const { BA_FLDZONE_S, LOMA } = propertyData
  const baFldZoneS = parseInt(BA_FLDZONE_S)
  const loma = parseInt(LOMA)

  console.log('loma ===> ', loma)
  console.log('baFldZoneS ===> ', baFldZoneS)

  if (loma === 0 && baFldZoneS <= 3) {
    return "HIGH, property at greater risk than stated by FEMA."
  } else {
    return ""
  }
}

export default InfoBox;

const InfoBoxWrapper = styled.div`
  padding-bottom: 20px;
  padding-top: 20px;
  display: grid;
  grid-gap: 20px;
`;

const StyledBasisOfDetermination = styled.div`
  display: grid;
  grid-gap: 4px;
  padding-left: 40px;
`